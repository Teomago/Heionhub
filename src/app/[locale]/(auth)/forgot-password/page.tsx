'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const t = useTranslations('Auth')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await fetch('/api/members/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      // ALWAYS show success — Enumeration Prevention
      // Never reveal whether the email exists or not
      setStatus('success')
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
            <CardTitle className="text-2xl font-bold">{t('forgotTitle')}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {t('forgotDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === 'success' ? (
              <div className="text-center space-y-4">
                <div className="text-green-500 text-sm font-semibold rounded-md bg-green-950/20 p-4 border border-green-900">
                  {t('forgotSuccess')}
                </div>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => router.push('/login')}
                >
                  {t('backToLogin')}
                </Button>
              </div>
            ) : (
              <form id="forgot-password-form" onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background border-input"
                    placeholder={t('emailPlaceholder')}
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
            <CardFooter className="flex flex-col gap-2">
              <Button
                type="submit"
                form="forgot-password-form"
                className="w-full bg-white text-black hover:bg-neutral-200"
                size="lg"
                disabled={loading}
              >
                {loading ? t('sending') : t('sendResetLink')}
              </Button>
              <Button
                variant="link"
                className="w-full text-muted-foreground hover:text-foreground"
                onClick={() => router.push('/login')}
              >
                {t('backToLogin')}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
