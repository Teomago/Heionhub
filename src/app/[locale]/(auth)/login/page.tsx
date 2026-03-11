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

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const t = useTranslations('Auth')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/members/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push('/app')
      } else {
        const data = await res.json()
        setError(data?.errors?.[0]?.message || t('invalidCredentials'))
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
            <CardTitle className="text-2xl font-bold">{t('loginTitle')}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {t('loginDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="login-form" onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background border-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background border-input"
                />
              </div>
              {error && (
                <div className="text-red-500 text-center text-sm font-semibold rounded-md bg-red-950/20 p-2 border border-red-900">
                  {error}
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              form="login-form"
              className="w-full bg-white text-black hover:bg-neutral-200"
              size="lg"
              disabled={loading}
            >
              {loading ? t('signingIn') : t('signIn')}
            </Button>
            <Button
              variant="link"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={() => router.push('/forgot-password')}
            >
              {t('forgotPassword')}
            </Button>
            <Button
              variant="link"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={() => router.push('/join')}
            >
              {t('haveInvitation')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
