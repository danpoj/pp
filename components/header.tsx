'use client'

import PingpingLogo from './pingping-logo'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { useModal } from './provider/modal-provider'
import { ThemeMenu } from './theme-menu'
import type { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import UserSetting from './user-setting'

type Props = {
  session: Session | null
}

export default function Header({ session }: Props) {
  const { onOpen } = useModal()
  const router = useRouter()

  return (
    <header className='sticky max-w-[92rem] pl-3 pr-5 pt-3 pb-2 mx-auto flex justify-between items-center'>
      <div className='flex items-center gap-4'>
        <PingpingLogo />
        <Button
          onClick={() => {
            if (!session) {
              onOpen('signin')
              return
            }

            router.push('/create')
          }}
          variant='ghost'
        >
          월드컵 만들기
        </Button>
      </div>

      <div className='flex items-center gap-2'>
        <Menu className='block sm:hidden' />

        <div className='hidden sm:flex sm:gap-2 sm:items-center'>
          <ThemeMenu />
          {session ? (
            <UserSetting session={session} />
          ) : (
            <>
              <Button onClick={() => onOpen('signin')} variant='outline' size='sm' className='text-xs font-bold'>
                로그인
              </Button>
              <Button onClick={() => onOpen('signup')} variant='blue' size='sm' className='text-xs font-bold'>
                회원가입
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
