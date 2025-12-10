import React from 'react'
import './styles.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

import { getPayload } from 'payload'
import config from '@/payload.config'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Basic metadata
  const title = siteSettings.title || 'Eterhub'
  const description = siteSettings.description || 'Welcome to Eterhub.'

  // OG Image handling
  let ogImage = null
  if (
    siteSettings.ogImage &&
    typeof siteSettings.ogImage === 'object' &&
    'url' in siteSettings.ogImage
  ) {
    ogImage = siteSettings.ogImage.url
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  }
}

import QueryProvider from '@/providers/QueryProvider'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <QueryProvider>
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  )
}
