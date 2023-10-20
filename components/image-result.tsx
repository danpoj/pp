'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from './ui/button'

type Props = {
  src: string
  description: string | null
}

export default function ImageResult({ src, description }: Props) {
  const [type, setType] = useState<'cover' | 'contain'>('contain')

  const toggle = () => {
    if (type === 'cover') setType('contain')
    else setType('cover')
  }

  return (
    <div className='relative w-full h-[24rem] shrink-0 lg:shrink lg:h-full'>
      <Image
        fill
        src={src}
        alt={description ?? 'cup image'}
        className={`${type === 'cover' ? 'object-cover' : 'object-contain'}`}
        quality={20}
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
