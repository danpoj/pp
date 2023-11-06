'use client'

import Loader from '@/components/loader'
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

      <h1 className='text-xl'>에러가 발생했습니다</h1>
      <Loader size='lg' />
    </div>
  )
}
