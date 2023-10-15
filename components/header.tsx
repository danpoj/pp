'use client'

import PingpingLogo from './pingping-logo'
import { Button, buttonVariants } from './ui/button'
import { useModal } from './provider/modal-provider'
import { ThemeMenu } from './theme-menu'
import type { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import UserSetting from './user-setting'
import MobileMenu from './mobile-menu'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  session: Session | null
}

export default function Header({ session }: Props) {
  const { open } = useModal()
  const router = useRouter()
  const path = usePathname()

  return (
    <header className='fixed w-full px-3 h-12 flex justify-between items-center bg-background/90 z-50 backdrop-blur-sm'>
      <div className='flex items-center gap-4'>
        <PingpingLogo />
        <Button
          className='hidden sm:block text-xs font-bold'
          onClick={() => {
            if (!session) {
              open('signin')
              return
            }

            router.push('/create')
          }}
          size='sm'
        >
          월드컵 만들기
        </Button>
        <div className='flex ml-3 gap-1 text-xs'>
          <Link
            href='/my/cup'
            className={cn(
              'hidden sm:flex items-center justify-center px-2 h-8 hover:bg-primary/5 rounded',
              path === '/my/cup' && 'underline underline-offset-4'
            )}
          >
            내 월드컵
          </Link>
          <Link
            href='/my/comment'
            className={cn(
              'hidden sm:flex items-center justify-center px-2 h-8 hover:bg-primary/5 rounded',
              path === '/my/comment' && 'underline underline-offset-4'
            )}
          >
            내 댓글
          </Link>
        </div>
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
