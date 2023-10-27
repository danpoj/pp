'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type ClipboardButtonProps = { path: string }

export const ClipboardButton = ({ path }: ClipboardButtonProps) => {
  const [copied, setCopied] = useState(false)
  const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.pingping.online'

  const onCopy = () => {
    setCopied(true)

    const $textarea = document.createElement('textarea')
    document.body.appendChild($textarea)

    $textarea.value = origin + path
    $textarea.select()

    document.execCommand('copy')

    document.body.removeChild($textarea)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <Button onClick={onCopy} className='flex-1 sm:px-1' size='sm' variant='ghost'>
      {copied ? (
        <>
          <div className='hidden sm:flex items-center'>
            <span className='text-xs'>복사완료!</span>
            <Check className='w-3 h-3 ml-1' />
          </div>
          <div className='flex sm:hidden items-center'>
            <span className='text-xs text-[0.65rem]'>복사</span>
            <Check className='w-3 h-3 ml-0.5' />
          </div>
        </>
      ) : (
        <>
          <div className='hidden sm:flex items-center'>
            <span className='text-xs'>공유하기</span>
            <Copy className='w-3 h-3 ml-1' />
          </div>
          <div className='flex sm:hidden items-center'>
            <span className='text-xs text-[0.60rem]'>공유</span>
            <Copy className='w-3 h-3 ml-0.5' />
          </div>
        </>
      )}
    </Button>
  )
}
