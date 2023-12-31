'use client'

import { cn } from '@/lib/utils'
import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any
  }
}

export default function GoogleAdsense({ className }: { className?: string }) {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <div className={cn('rounded-lg overflow-hidden dark:bg-border/20 w-full', className)}>
      <ins
        className='adsbygoogle block'
        data-ad-format='fluid'
        data-ad-layout-key='-7w+eo+0+2+1'
        data-ad-client='ca-pub-3412419424653583'
        data-ad-slot='6021221123'
      />
    </div>
  )
}
