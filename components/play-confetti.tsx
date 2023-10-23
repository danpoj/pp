'use client'

import { useEffect } from 'react'
import { useConfetti } from '@/components/provider/confetti-provider'

export default function PlayConfetti() {
  const { open: openConfetti } = useConfetti()

  useEffect(() => {
    openConfetti()
  }, [])

  return null
}
