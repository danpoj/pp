'use client'

import { cn } from '@/lib/utils'
import type { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import MobileMenu from './mobile-menu'
import PingpingLogo from './pingping-logo'
import { useModal } from './provider/modal-provider'
import { ThemeMenu } from './theme-menu'
import { Button } from './ui/button'
import UserSetting from './user-setting'
import HeartEmoji from './heart-emoji'

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
          className='hidden sm:block text-xs font-bold h-8'
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
          <button
            onClick={() => {
              if (!session) {
                open('signin')
                return
              }
              router.push('/my/cup')
            }}
            className={cn(
              'hidden sm:flex items-center justify-center px-2 h-8 hover:bg-primary/5 rounded',
              path === '/my/cup' && 'underline underline-offset-4'
            )}
          >
            내 월드컵
          </button>
          <button
            onClick={() => {
              if (!session) {
                open('signin')
                return
              }
              router.push('/my/comment')
            }}
            className={cn(
              'hidden sm:flex items-center justify-center px-2 h-8 hover:bg-primary/5 rounded',
              path === '/my/comment' && 'underline underline-offset-4'
            )}
          >
            내 댓글
          </button>

          <button
            onClick={() => {
              if (!session) open('signin')
              router.push('/my/likes')
            }}
            className={cn(
              'hidden sm:flex items-center justify-center px-2 h-8 hover:bg-primary/5 rounded gap-0.5',
              path === '/my/likes' && 'underline underline-offset-4'
            )}
          >
            <HeartEmoji className='fill-red-500 stroke-red-500 mr-1' /> 좋아요
          </button>
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
                className='text-xs font-bold transition-none h-8'
              >
                로그인
              </Button>
              <Button onClick={() => open('signup')} variant='blue' size='sm' className='text-xs font-bold h-8'>
                회원가입
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
