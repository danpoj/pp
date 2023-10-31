'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
      <Button onClick={() => router.push('/')} className='flex gap-1 items-center mb-10'>
        <ArrowLeft />
        홈으로 이동하기
      </Button>

      <h1 className='text-xl'>에러!</h1>
      <Image
        src='/loader.gif'
        width={120}
        height={120}
        alt='brand image'
        className='w-[120px] h-[120px] object-contain'
        priority
      />
    </div>
  )
}
