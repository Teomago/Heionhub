'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerMember } from '@/app/[locale]/(frontend)/actions/auth'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('Auth')

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const invitationCode = (formData.get('invitationCode') ?? '') as string

    try {
      const result = await registerMember(formData, invitationCode, locale)
      if (result.success) {
        router.push('/login')
      } else {
        setError(result.message || t('registrationFailed'))
      }
    } catch (err) {
      console.error(err)
      setError(t('somethingWentWrong'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">Miru</p>
          <h1 className="text-3xl font-bold tracking-tight">{t('registerTitle')}</h1>
          <p className="text-sm text-muted-foreground">{t('registerDescription')}</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">
                {t('firstName')} <span className="text-red-500">*</span>
              </Label>
              <Input id="firstName" name="firstName" required autoComplete="given-name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="secondName">{t('secondName')}</Label>
              <Input id="secondName" name="secondName" autoComplete="additional-name" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="lastName">
                {t('lastName')} <span className="text-red-500">*</span>
              </Label>
              <Input id="lastName" name="lastName" required autoComplete="family-name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="secondLastName">{t('secondLastName')}</Label>
              <Input id="secondLastName" name="secondLastName" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">
              {t('email')} <span className="text-red-500">*</span>
            </Label>
            <Input id="email" name="email" type="email" required autoComplete="email" placeholder={t('emailPlaceholder')} />
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="password">
                {t('password')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder={t('minCharsPlaceholder')}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">
                {t('confirmPassword')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                placeholder={t('reEnterPlaceholder')}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground uppercase">{t('optional')}</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Invitation code — optional, last */}
          <div className="space-y-1.5">
            <Label htmlFor="invitationCode">{t('invitationCode')}</Label>
            <Input
              id="invitationCode"
              name="invitationCode"
              className="tracking-widest uppercase"
              maxLength={14}
              placeholder="XXXXXXXXXXXXXX"
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase()
              }}
            />
            <p className="text-xs text-muted-foreground">{t('invitationCodeHint')}</p>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium rounded-md bg-red-950/20 p-3 border border-red-900">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? t('creatingAccount') : t('createAccountButton')}
          </Button>
        </form>

        <div className="text-center text-sm">
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => router.push('/login')}
          >
            {t('alreadyHaveAccount')}
          </button>
        </div>
      </div>
    </div>
  )
}
