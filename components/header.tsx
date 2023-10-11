'use client'

import PingpingLogo from './pingping-logo'
import { Button } from './ui/button'
import { useModal } from './provider/modal-provider'
import { ThemeMenu } from './theme-menu'
import type { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import UserSetting from './user-setting'
import MobileMenu from './mobile-menu'

type Props = {
  session: Session | null
}

export default function Header({ session }: Props) {
  const { open } = useModal()
  const router = useRouter()

  return (
    <header className='fixed w-full px-3 h-12 flex justify-between items-center bg-background/90 z-50 backdrop-blur-sm'>
      <div className='flex items-center gap-4'>
        <PingpingLogo />
        <Button
          className='hidden sm:block'
          onClick={() => {
            if (!session) {
              open('signin')
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
        <div className='block sm:hidden'>
          <ThemeMenu />
        </div>
        <MobileMenu session={session} />

        <div className='hidden sm:flex sm:gap-2 sm:items-center'>
          <ThemeMenu />
          {session ? (
            <UserSetting session={session} />
          ) : (
            <>
              <Button
                onClick={() => open('signin')}
                variant='outline'
                size='sm'
                className='text-xs font-bold transition-none'
              >
                로그인
              </Button>
              <Button onClick={() => open('signup')} variant='blue' size='sm' className='text-xs font-bold'>
                회원가입
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
