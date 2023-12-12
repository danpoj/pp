'use client'

import { Button } from '@/components/ui/button'
import { useModal } from './provider/modal-provider'

export default function HeaderSignButtons() {
  const { open } = useModal()

  return (
    <>
      <Button
        onClick={() => open('signin')}
        variant='outline'
        size='sm'
        className='text-xs font-bold transition-none h-8'
      >
        로그인
      </Button>
      <Button onClick={() => open('signup')} variant='blue' size='sm' className='text-xs font-bold h-8'>
        회원가입
      </Button>
    </>
  )
}
