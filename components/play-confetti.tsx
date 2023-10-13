'use client'

import { useEffect } from 'react'
import { useConfetti } from './provider/confetti-provider'

export default function PlayConfetti() {
  const { open: openConfetti } = useConfetti()

  useEffect(() => {
    openConfetti()
  }, [openConfetti])

  return null
}
