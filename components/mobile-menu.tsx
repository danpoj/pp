'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, Menu, MessageSquare, Swords, User2 } from 'lucide-react'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import HeartEmoji from '@/components/heart-emoji'
import { useModal } from '@/components/provider/modal-provider'
import { Button } from '@/components/ui/button'

type Props = {
  session: Session | null
}

export default function MobileMenu({ session }: Props) {
  const { open } = useModal()
  const router = useRouter()

  return (
    <div className='block sm:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger className='rounded select-none group relative h-10 px-2'>
          <Menu className='block sm:hidden' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-60 text-primary/60 p-2 block sm:hidden'>
          {session ? (
            <DropdownMenuLabel className='flex gap-2 items-center'>
              <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                <Image
                  unoptimized
                  src={session.user.image!}
                  alt='logged in user image'
                  fill
                  className=' dark:bg-white object-cover'
                />
              </div>
              <span className='text-xs font-mono'>@{session.user.nickname}</span>
            </DropdownMenuLabel>
          ) : (
            <DropdownMenuItem className='gap-2'>
              <Button onClick={() => open('signin')} variant='outline' size='sm' className='text-xs font-bold'>
                로그인
              </Button>
              <Button onClick={() => open('signup')} variant='blue' size='sm' className='text-xs font-bold'>
                회원가입
              </Button>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          {session && (
            <>
              <DropdownMenuItem className='h-9 text-xs cursor-pointer flex-1' asChild>
                <Link href='/my/cup'>
                  <Swords className='w-4 h-4 mr-2' /> 내 월드컵
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='h-9 text-xs cursor-pointer flex-1' asChild>
                <Link href='/my/comment'>
                  <MessageSquare className='w-4 h-4 mr-2' /> 내 댓글
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='h-9 text-xs cursor-pointer flex-1 gap-2' asChild>
                <Link href='/my/likes'>
                  <HeartEmoji className='w-4 h-4 fill-red-500 stroke-red-500 ' /> 좋아요
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem className='h-9 text-xs cursor-pointer' asChild>
            <Link href='/setting'>
              <User2 className='w-4 h-4 mr-2' /> 설정
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <Button
            className='w-full h-9'
            onClick={() => {
              if (!session) {
                open('signin')
                return
              }

              router.push('/create')
            }}
          >
            월드컵 만들기
          </Button>

          <DropdownMenuSeparator />

          {session && (
            <DropdownMenuItem className='text-xs cursor-pointer' onClick={() => signOut()}>
              <LogOut className='w-4 h-4 mr-2' /> 로그아웃
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
