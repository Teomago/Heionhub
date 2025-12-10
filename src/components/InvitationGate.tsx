'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { verifyInvitation, registerMember } from '@/app/(frontend)/actions/auth'
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
import { useRouter } from 'next/navigation'

interface InvitationGateProps {
  globals: {
    title: string
    subtitle: string
  }
}

export default function InvitationGate({ globals }: InvitationGateProps) {
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'CODE' | 'REGISTER' | 'WELCOME'>('CODE')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [welcomeText, setWelcomeText] = useState('Bienvenido')
  const router = useRouter()

  const handleVerify = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await verifyInvitation(code)
      if (result.success) {
        setStep('REGISTER')
      } else {
        setError(result.message || 'Invalid code.')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    try {
      const result = await registerMember(formData, code)
      if (result.success) {
        setStep('WELCOME')

        // Sequence of welcome messages
        const messages = ['Bienvenido', 'Welcome', 'Willkommen', 'Benvenuto', 'Bem-vindo', 'Home']
        let i = 0

        const interval = setInterval(() => {
          i++
          if (i < messages.length) {
            setWelcomeText(messages[i])
          } else {
            clearInterval(interval)
            router.push('/login')
          }
        }, 1000)
      } else {
        setError(result.message || 'Registration failed.')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong during registration.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 animate-in fade-in duration-500">
      <AnimatePresence mode="wait">
        {step === 'CODE' && (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg"
          >
            <Card className="border-neutral-800 bg-neutral-900/50 text-foreground backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold leading-tight">{globals.title}</CardTitle>
                <CardDescription className="text-lg text-neutral-400 pt-2">
                  {globals.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Input
                      placeholder="ENTER-YOUR-CODE-HERE"
                      className="bg-neutral-950 border-neutral-800 text-center text-xl tracking-widest uppercase h-14"
                      maxLength={14}
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                    />
                  </div>
                  {error && (
                    <div className="text-red-500 text-center text-sm font-semibold rounded-md bg-red-950/20 p-2 border border-red-900">
                      {error}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full mb-2 bg-white text-black hover:bg-neutral-200"
                  size="lg"
                  onClick={handleVerify}
                  disabled={loading || code.length < 14}
                >
                  {loading ? 'Verifying...' : 'Validate Invitation'}
                </Button>
                <Button
                  variant="link"
                  className="w-full text-neutral-400 hover:text-white"
                  onClick={() => router.push('/login')}
                >
                  Back to Login
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {step === 'REGISTER' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl"
          >
            <Card className="border-neutral-800 bg-neutral-900/50 text-foreground backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Welcome Home</CardTitle>
                <CardDescription>Fill in your details to complete registration.</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="register-form" onSubmit={handleRegister} className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        className="bg-neutral-950 border-neutral-800"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="secondName">Second Name</Label>
                      <Input
                        id="secondName"
                        name="secondName"
                        className="bg-neutral-950 border-neutral-800"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        className="bg-neutral-950 border-neutral-800"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="secondLastName">Second Last Name</Label>
                      <Input
                        id="secondLastName"
                        name="secondLastName"
                        className="bg-neutral-950 border-neutral-800"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-neutral-950 border-neutral-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="bg-neutral-950 border-neutral-800"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="bg-neutral-950 border-neutral-800"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-500 text-center text-sm font-semibold">{error}</div>
                  )}
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" form="register-form" className="w-full" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Enter Home'}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {step === 'WELCOME' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="text-center"
          >
            <motion.h1
              key={welcomeText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-white"
            >
              {welcomeText}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
