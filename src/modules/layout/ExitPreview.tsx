'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

/**
 * Exit preview button displayed when Next.js draft mode is active.
 * Navigates to /next/exit-preview which disables draft mode and redirects back.
 */
export const ExitPreview: React.FC = () => {
  const router = useRouter()

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        type="button"
        onClick={() => router.push('/next/exit-preview')}
        className="bg-black text-white text-sm px-4 py-2 rounded-md shadow-lg hover:bg-gray-800 transition-colors"
      >
        Exit Preview
      </button>
    </div>
  )
}
