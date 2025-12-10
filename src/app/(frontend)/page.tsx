import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const homeData = await payload.findGlobal({
    slug: 'home',
  })

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-6xl font-black tracking-tighter sm:text-7xl lg:text-8xl">
          {homeData.title}
        </h1>
        <p className="text-xl font-medium text-muted-foreground uppercase tracking-[0.2em] sm:text-2xl">
          {homeData.subtitle}
        </p>

        <div className="pt-8">
          <Link href="/login">
            <Button
              size="lg"
              className="h-14 px-10 text-lg font-bold uppercase tracking-widest rounded-full bg-white text-black hover:bg-neutral-200 hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              {homeData.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
