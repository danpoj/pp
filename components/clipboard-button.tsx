'use client'

import { Check, Copy } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { Button } from './ui/button'

type ClipboardButtonProps = { path: string }

export const ClipboardButton = ({ path }: ClipboardButtonProps) => {
  const [copied, setCopied] = useState(false)
  const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.pingping.online'

  const onCopy = () => {
    navigator.clipboard.writeText(origin + path)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <Button onClick={onCopy} className='flex-1 px-1' size='sm' variant='ghost'>
      {copied ? (
        <>
          <span className='text-xs'>복사</span>
          <Check className='w-3 h-3 ml-1 hidden sm:block' />
        </>
      ) : (
        <>
          <span className='text-xs'>공유</span>
          <Copy className='w-3 h-3 ml-1 hidden sm:block' />
        </>
      )}
    </Button>
  )
}
