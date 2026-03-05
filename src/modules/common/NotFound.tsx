import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/buttons'

/**
 * Generic 404 Not Found page component.
 * Used when a page or article can't be found.
 */
export function NotFound({
  title = 'Page Not Found',
  message = "The page you're looking for doesn't exist or has been moved.",
}: {
  title?: string
  message?: string
}) {
  return (
    <div className="container py-28">
      <div className="max-w-lg">
        <p className="text-sm font-medium text-muted-foreground mb-2">404</p>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{message}</p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}
