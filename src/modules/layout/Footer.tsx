import React from 'react'
import Link from 'next/link'
import { getCachedGlobal } from '@/modules/common/data'
import type { FooterSettings } from '@/payload-types'
import { getLinkProps, type LinkFieldData } from '@/lib/utils/getLinkProps'

/* ── Social platform icon SVGs ─────────────────────────────────────── */

const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  mail: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
}

/**
 * Site footer component.
 * Three columns: left (navigation), middle (contact & social), right (legal + copyright).
 * All configurable from the Footer global in the admin panel.
 */
export async function Footer({ locale }: { locale?: string }) {
  const footer = await getCachedGlobal<FooterSettings>('footer', 2, locale).catch(() => null)

  const navigation = footer?.navigation
  const contact = footer?.contact
  const legal = footer?.legal
  const navLinks = navigation?.links || []
  const legalLinks = legal?.links || []
  const socialLinks = contact?.socialLinks || []

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="flex flex-col gap-8 sm:flex-row">
          {/* Left — Navigation */}
          <div className="sm:flex-1">
            {navigation?.title && (
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {navigation.title}
              </h3>
            )}
            <ul className="flex flex-col gap-2">
              {navLinks.map((item) => {
                const linkData = item.link as LinkFieldData | undefined
                if (!linkData) return null
                const props = getLinkProps(linkData)
                if (!props.href) return null

                return (
                  <li key={item.id}>
                    <Link
                      href={props.href}
                      target={props.target}
                      rel={props.rel}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {linkData.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Middle — Contact & Social */}
          <div className="sm:flex sm:flex-1 sm:flex-col sm:items-center sm:text-center">
            {contact?.title && (
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {contact.title}
              </h3>
            )}
            <ul className="flex flex-col gap-2">
              {contact?.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact?.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
            </ul>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex gap-3 sm:justify-center">
                {socialLinks.map((item) => {
                  if (!item.platform || !item.url) return null
                  const isMail = item.platform === 'mail'
                  const href = isMail ? `mailto:${item.url}` : item.url

                  return (
                    <a
                      key={item.id}
                      href={href}
                      {...(!isMail && { target: '_blank', rel: 'noopener noreferrer' })}
                      className="text-muted-foreground/60 transition-colors hover:text-foreground"
                      aria-label={item.platform}
                    >
                      {socialIcons[item.platform]}
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right — Legal */}
          <div className="sm:flex-1 sm:text-right">
            {legal?.title && (
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {legal.title}
              </h3>
            )}
            <ul className="flex flex-col gap-2">
              {legalLinks.map((item) => {
                const linkData = item.link as LinkFieldData | undefined
                if (!linkData) return null
                const props = getLinkProps(linkData)
                if (!props.href) return null

                return (
                  <li key={item.id}>
                    <Link
                      href={props.href}
                      target={props.target}
                      rel={props.rel}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {linkData.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            {legal?.copyright && <p className="mt-6 text-xs text-muted-foreground/60">{legal.copyright}</p>}
          </div>
        </div>
      </div>
    </footer>
  )
}
