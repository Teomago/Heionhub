import React from 'react'
import Link from 'next/link'
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
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4 animate-in fade-in duration-500">
      <Card className="w-full max-w-sm border-neutral-800 bg-neutral-900/50 text-foreground backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">Login</CardTitle>
          <CardDescription className="text-neutral-400">
            Enter your credentials to access your home.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="bg-neutral-950 border-neutral-800"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="bg-neutral-950 border-neutral-800" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full font-semibold bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]">
            Sign in
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href="/join"
              className="underline underline-offset-4 hover:text-primary transition-colors"
            >
              Signup
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
