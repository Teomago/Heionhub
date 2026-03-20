'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslations } from 'next-intl'

interface WelcomeOverlayProps {
  firstName: string
}

export function WelcomeOverlay({ firstName }: WelcomeOverlayProps) {
  const [visible, setVisible] = useState(false)
  const t = useTranslations('Auth')

  useEffect(() => {
    const flag = sessionStorage.getItem('miru_welcome')
    if (!flag) return

    sessionStorage.removeItem('miru_welcome')
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // opacity:1 immediately on mount so the dashboard is covered before the text animates in
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
        >
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white"
          >
            {t('welcomeMessage', { name: firstName })}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
