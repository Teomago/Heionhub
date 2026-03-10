import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export async function middleware(req: NextRequest) {
  // Graceful degradation for local development without KV vars
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    console.warn('Rate limiting disabled: KV variables missing')
    return NextResponse.next()
  }

  // Initialize the client manually using the Vercel-provided variables or Upstash ones
  const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })

  // Create rate limiters
  // Strict: 5 requests per minute for Auth
  const authRatelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
  })

  // Moderate: 30 requests per minute for App Actions / Mutations
  const apiRatelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '1 m'),
  })

  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const path = req.nextUrl.pathname

  // Apply Strict Limiting to Auth Endpoints
  if (path.startsWith('/api/members/login') || path.startsWith('/api/users/login')) {
    try {
      const { success, limit, reset, remaining } = await authRatelimit.limit(`auth_${ip}`)

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
      // Fail open if Redis crashes so we don't lock out all users
      return NextResponse.next()
    }
  }

  // Apply Moderate Limiting to Server Actions / App APIs
  // Note: Next.js Server Actions hit the page path with a POST request, or specific API routes.
  if (req.method === 'POST' && (path.startsWith('/app') || path.startsWith('/api'))) {
    try {
      const { success } = await apiRatelimit.limit(`api_${ip}`)

      if (!success) {
        return new NextResponse('Too Many Requests', { status: 429 })
      }
    } catch (err) {
      console.error('API Rate limiter failed (Upstash Error):', err)
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

// Configure matcher to only run on API and App routes
export const config = {
  matcher: ['/api/:path*', '/app/:path*'],
}
