'use client'

import Link from 'next/link'
import PingpingLogo from './pingping-logo'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { useModal } from './provider/modal-provider'

export default function Header() {
  const { onOpen } = useModal()

  return (
    <header className='sticky max-w-[92rem] px-3 h-12 mx-auto flex justify-between items-center border-b'>
      <div className='flex items-center gap-6'>
        <PingpingLogo />
        <Link href='/create'>월드컵 만들기</Link>
      </div>

      <div className='flex items-center gap-2'>
        <Menu className='block sm:hidden' />

        <div className='hidden sm:flex sm:gap-2'>
          <Button onClick={() => onOpen('signin')} variant='outline' size='sm' className='text-xs font-bold'>
            로그인
          </Button>
          <Button onClick={() => onOpen('signup')} variant='register' size='sm' className='text-xs font-bold'>
            회원가입
          </Button>
        </div>
      </div>
    </header>
  )
}
