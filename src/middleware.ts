import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en'
})

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // --- Static File Guard: never let favicon.ico or other dotted paths reach intl ---
  if (path.includes('.')) {
    return NextResponse.next()
  }

  // --- Next.js internal routes and preview mode bypass ---
  if (path.startsWith('/next')) {
    return NextResponse.next()
  }

  // --- Rate Limiting (best-effort, fail-open) ---
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })

    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'

    // Strict: 5 requests per minute for Auth
    if (path.startsWith('/api/members/login') || path.startsWith('/api/users/login')) {
      try {
        const { success, limit, reset, remaining } = await new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(5, '1 m'),
        }).limit(`auth_${ip}`)

        if (!success) {
          return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
            },
          })
        }
      } catch (err) {
        console.error('Auth Rate limiter failed (Upstash Error):', err)
      }
    }

    // Moderate: 30 requests per minute for App Actions / Mutations
    if (req.method === 'POST' && (path.startsWith('/app') || path.startsWith('/api'))) {
      try {
        const { success } = await new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(30, '1 m'),
        }).limit(`api_${ip}`)

        if (!success) {
          return new NextResponse('Too Many Requests', { status: 429 })
        }
      } catch (err) {
        console.error('API Rate limiter failed (Upstash Error):', err)
      }
    }
  }

  // --- i18n Locale Routing (ALWAYS runs) ---
  return intlMiddleware(req)
}

export const config = {
  matcher: ['/', '/(en|es)/:path*', '/((?!admin|api|next|_next|_vercel).*)'],
}
