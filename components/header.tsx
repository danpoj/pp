'use client'

import MobileMenu from '@/components/mobile-menu'
import PingpingLogo from '@/components/pingping-logo'
import { useModal } from '@/components/provider/modal-provider'
import { ThemeMenu } from '@/components/theme-menu'
import { Button } from '@/components/ui/button'
import UserSetting from '@/components/user-setting'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import type { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'

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
        <nav className='flex ml-3 gap-1 text-xs'>
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
              path === '/my/cup' && 'font-bold underline underline-offset-4'
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
              path === '/my/comment' && 'font-bold underline underline-offset-4'
            )}
          >
            내 댓글
          </button>

          <button
            onClick={() => {
              if (!session) {
                open('signin')
                return
              }
              router.push('/my/likes')
            }}
            className={cn(
              'hidden sm:flex items-center justify-center px-2 h-8 hover:bg-primary/5 rounded gap-0.5',
              path === '/my/likes' && 'font-bold underline underline-offset-4'
            )}
          >
            <Star className='w-3.5 h-3.5 fill-yellow-300 stroke-yellow-600' /> 스크랩
          </button>
        </nav>
      </div>

      <div className='flex items-center gap-2'>
        <div className='block sm:hidden'>
          <ThemeMenu />
        </div>
        <MobileMenu session={session} />

        <aside className='hidden sm:flex sm:gap-2 sm:items-center'>
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
        </aside>
      </div>
    </header>
  )
}
