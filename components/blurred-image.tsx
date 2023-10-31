'use client'

import { cn } from '@/lib/utils'
import type { CupType } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  thumbnail: string
  title: string
  width: number
  height: number
  type: CupType
}

export const BlurredImage = ({ thumbnail, title, width, height, type }: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Image
      src={thumbnail}
      alt={title}
      // quality={40}
      width={width}
      height={height}
      className={cn(
        'object-contain duration-200 ease-in-out group-hover:scale-105 group-active:scale-110 w-full',
        isLoading ? ' blur-[3px] ' : 'blur-0'
      )}
      onLoadingComplete={() => setIsLoading(false)}
    />
  )
}
