'use client'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

/**
 * Live preview listener for the frontend.
 * Refreshes the route when edits are saved in the admin panel.
 */
export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')

  return <PayloadLivePreview refresh={() => router.refresh()} serverURL={serverURL} />
}
