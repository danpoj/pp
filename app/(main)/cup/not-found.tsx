'use client'

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
      <Button onClick={() => router.push('/')} className='flex gap-1 items-center mb-10'>
        <ArrowLeft />
        홈으로 이동하기
      </Button>

      <h1 className='text-xl'>페이지를 찾을 수 없습니다</h1>
      <p className='text-lg'>404 Not Found</p>
      <Loader size='md' />
    </div>
  )
}
