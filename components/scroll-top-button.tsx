'use client'

import { ArrowUp } from 'lucide-react'

export default function ScrollTopButton() {
  const onClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <button
      onClick={onClick}
      className='p-1 w-9 h-9 flex items-center justify-center fixed right-5 bottom-5 z-50 bg-foreground/60 text-background rounded-full hover:bg-foreground transition-all'
    >
      <ArrowUp className='w-5 h-5' />
    </button>
  )
}
