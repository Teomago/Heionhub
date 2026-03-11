import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCachedGlobal } from '@/modules/common/data'
import type { HeaderSettings, Media } from '@/payload-types'
import { getLinkProps, type LinkFieldData } from '@/lib/utils/getLinkProps'
import { isExpanded } from '@/lib/utils/isExpanded'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { getPayload } from '@/lib/payload/getPayload'

/**
 * Site header component.
 * Three sections: left (nav links), center (logo), right (optional CTA).
 * All configurable from the Header global in the admin panel.
 */
export async function Header({ locale }: { locale?: string }) {
  const header = await getCachedGlobal<HeaderSettings>('header', 2, locale).catch(() => null)

  // Fetch Kill-Switch
  const payload = await getPayload()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' as any }).catch(() => null)
  const isMultiLangEnabled = (siteSettings as any)?.enableMultiLanguage !== false

  const navLinks = header?.navLinks || []
  const logo = header?.logo
  const cta = header?.cta

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container relative flex h-16 items-center justify-between">
        {/* Left — Navigation Links */}
        <nav className="flex items-center gap-6">
          {navLinks.map((item) => {
            const linkData = item.link as LinkFieldData | undefined
            if (!linkData) return null
            const props = getLinkProps(linkData)
            if (!props.href) return null

            return (
              <Link
                key={item.id}
                href={props.href}
                target={props.target}
                rel={props.rel}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {linkData.label}
              </Link>
            )
          })}
        </nav>

        {/* Center — Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          {logo?.type === 'image' && logo.image && isExpanded(logo.image) ? (
            <Link href="/">
              <Image
                src={(logo.image as Media).url || ''}
                alt={(logo.image as Media).alt || ''}
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
          ) : logo?.type === 'text' && logo.text ? (
            <Link href="/" className="text-lg font-bold text-foreground">
              {logo.text}
            </Link>
          ) : null}
        </div>

        {/* Right — CTA Button & Theme Toggle */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher isMultiLangEnabled={isMultiLangEnabled} />
          <ThemeToggle />
          {cta?.enabled && cta.link
            ? (() => {
                const ctaLink = cta.link as LinkFieldData
                const props = getLinkProps(ctaLink)
                if (!props.href) return null

                return (
                  <Link
                    href={props.href}
                    target={props.target}
                    rel={props.rel}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {ctaLink.label}
                  </Link>
                )
              })()
            : null}
        </div>
      </div>
    </header>
  )
}
