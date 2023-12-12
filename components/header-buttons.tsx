'use client'

import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useModal } from '@/components/provider/modal-provider'
import type { Session } from 'next-auth'

type Props = {
  session: Session | null
}

export default function HeaderButtons({ session }: Props) {
  const { open } = useModal()
  const router = useRouter()
  const path = usePathname()

  return (
    <>
      <Button
        className='text-[10px] sm:text-xs font-bold h-7 sm:h-8'
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
    </>
  )
}
