'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type ClipboardButtonProps = { path: string }

export const ClipboardButton = ({ path }: ClipboardButtonProps) => {
  const [copied, setCopied] = useState(false)
  const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.pingping.online'

  // const onCopy = () => {
  //   navigator.clipboard.writeText(origin + path)
  //   setCopied(true)

  //   setTimeout(() => {
  //     setCopied(false)
  //   }, 1000)
  // }

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
    <Button onClick={onCopy} className='flex-1 px-1' size='sm' variant='ghost'>
      {copied ? (
        <>
          <span className='text-xs'>복사완료!</span>
          <Check className='w-3 h-3 ml-1' />
        </>
      ) : (
        <>
          <span className='text-xs'>공유하기</span>
          <Copy className='w-3 h-3 ml-1' />
        </>
      )}
    </Button>
  )
}
