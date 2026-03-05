'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

async function checkSession() {
  const res = await fetch('/api/members/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('Unauthorized')
  }

  const data = await res.json()

  if (!data?.user) {
    throw new Error('Unauthorized')
  }

  return data.user
}

export function AuthSync() {
  const router = useRouter()

  const { isError } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: checkSession,
    // Whenever the user focuses the window, React Query will run this check
    refetchOnWindowFocus: true,
    // Don't retry on 401s, just fail immediately so we can redirect
    retry: false,
    // We don't need this to run in the background on an interval,
    // just when they click back to the tab.
  })

  useEffect(() => {
    // If we ever get an unauthorized error (like the cookie was cleared in another tab),
    // kick the user to the login screen immediately.
    if (isError) {
      router.push('/login')
    }
  }, [isError, router])

  // This is a silent, unrendered component. It just acts as a listener.
  return null
}
