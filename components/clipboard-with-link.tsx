'use client'

import { HTMLAttributes, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

type ClipboardWithLinkProps = HTMLAttributes<HTMLDivElement> & { path: string; title?: string }

export const ClipboardWithLink = ({ path, title, ...props }: ClipboardWithLinkProps) => {
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
    <div {...props}>
      <Label className='text-xs font-bold text-primary/70 w-fit shrink-0'>{title ?? '링크 공유하기'}</Label>
      <div className='flex items-center gap-x-2 w-full'>
        <Input
          className='bg-primary-foreground pl-2 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full text-primary/40 text-xs font-medium'
          value={origin + path}
          readOnly
        />
        <Button onClick={onCopy} size='icon' className={cn('bg-primary/40 w-16')}>
          {copied ? <Check className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
        </Button>
      </div>
    </div>
  )
}