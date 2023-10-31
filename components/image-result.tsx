'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

type Props = {
  width: number
  height: number
  src: string
  description: string | null
}

export default function ImageResult({ width, height, src, description }: Props) {
  const [type, setType] = useState<'cover' | 'contain'>('contain')

  const toggle = () => {
    if (type === 'cover') setType('contain')
    else setType('cover')
  }

  return (
    <div className='relative w-full h-[24rem] shrink-0 lg:shrink lg:h-full'>
      <Image
        unoptimized
        width={600}
        height={520}
        src={src}
        alt={description ?? 'cup image'}
        className={cn('w-full h-full', type === 'cover' ? 'object-cover' : 'object-contain')}
      />
      <Button
        onClick={toggle}
        className='absolute left-2 top-2 text-xs tracking-tight font-bold text-primary-foreground/90'
      >
        이미지 비율 조절
      </Button>
    </div>
  )
}
