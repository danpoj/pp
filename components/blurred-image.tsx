'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import { CupType } from '@prisma/client'

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
    <>
      {type === 'IMAGE' ? (
        <CldImage
          src={thumbnail}
          alt={title}
          quality={20}
          width={width / 3}
          height={height / 3}
          className={cn(
            'object-cover duration-150 ease-in-out group-hover:scale-105 group-active:scale-110 w-full',
            isLoading ? ' blur scale-105' : 'blur-0 scale-100'
          )}
          // sizes='(max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw'
          onLoadingComplete={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={thumbnail}
          alt={title}
          quality={20}
          width={width / 3}
          height={height / 3}
          className={cn(
            'object-cover duration-150 ease-in-out group-hover:scale-105 group-active:scale-110 w-full',
            isLoading ? ' blur scale-105' : 'blur-0 scale-100'
          )}
          // sizes='(max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw'
          onLoadingComplete={() => setIsLoading(false)}
        />
      )}
    </>
  )
}
