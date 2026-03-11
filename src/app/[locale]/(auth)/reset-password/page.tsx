'use client'

import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()
  const t = useTranslations('Auth')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const [loading, setLoading] = useState(false)

  if (!token) {
    return (
      <div className="flex w-full items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-border bg-card text-card-foreground shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">{t('invalidToken')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-red-500 text-center text-sm font-semibold rounded-md bg-red-950/20 p-4 border border-red-900">
                {t('missingToken')}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-white text-black hover:bg-neutral-200"
                size="lg"
                onClick={() => router.push('/forgot-password')}
              >
                {t('requestNewLink')}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (newPassword !== confirmPassword) {
      setError(t('passwordsMismatch'))
      return
    }

    if (newPassword.length < 8) {
      setError(t('passwordMinLength'))
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/members/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: newPassword }),
      })

      if (res.ok) {
        setStatus('success')
        // Safe Redirect Rule: redirect to /login instead of /app
        setTimeout(() => router.push('/login'), 2000)
      } else {
        const data = await res.json()
        setError(data?.errors?.[0]?.message || t('tokenExpired'))
      }
    } catch {
      setError(t('somethingWentWrong'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-border bg-card text-card-foreground shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{t('resetTitle')}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {t('resetDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === 'success' ? (
              <div className="text-center space-y-4">
                <div className="text-green-500 text-sm font-semibold rounded-md bg-green-950/20 p-4 border border-green-900">
                  {t('resetSuccess')}
                </div>
              </div>
            ) : (
              <form id="reset-password-form" onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">{t('newPassword')}</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    className="bg-background border-input"
                    placeholder={t('minCharsPlaceholder')}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="bg-background border-input"
                    placeholder={t('reEnterPlaceholder')}
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-center text-sm font-semibold rounded-md bg-red-950/20 p-2 border border-red-900">
                    {error}
                  </div>
                )}
              </form>
            )}
          </CardContent>
          {status !== 'success' && (
            <CardFooter>
              <Button
                type="submit"
                form="reset-password-form"
                className="w-full bg-white text-black hover:bg-neutral-200"
                size="lg"
                disabled={loading}
              >
                {loading ? t('resetting') : t('resetButton')}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}

// Next.js 15 Suspense Rule: useSearchParams() MUST be wrapped in Suspense
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full items-center justify-center p-4">
          <div className="w-full max-w-md text-center text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}
