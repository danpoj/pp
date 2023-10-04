'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, Menu, Settings, Swords, User2 } from 'lucide-react'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { useModal } from './provider/modal-provider'
import { useRouter } from 'next/navigation'

type Props = {
  session: Session | null
}

export default function MobileMenu({ session }: Props) {
  const { open } = useModal()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded select-none group relative p-1'>
        <Menu className='block sm:hidden' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-72 text-primary/60 p-2 block sm:hidden'>
        {session ? (
          <DropdownMenuLabel className='flex gap-2 items-center'>
            <Image
              src={session.user.image!}
              alt='logged in user image'
              width={52}
              height={52}
              className='p-1 rounded-full border-[1.5px] border-slate-300 dark:bg-white'
            />
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
          <DropdownMenuItem className='py-2.5 cursor-pointer' asChild>
            <Link href={`/my/${session.user.nickname}`}>
              <User2 className='w-5 h-5 mr-2' /> 내 활동
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className='py-2.5 cursor-pointer' asChild>
          <Link href='/setting'>
            <Settings className='w-5 h-5 mr-2' /> 설정
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='py-2.5 cursor-pointer' asChild>
          <button
            className='w-full'
            onClick={() => {
              if (!session) {
                open('signin')
                return
              }

              router.push('/create')
            }}
          >
            <Swords className='w-5 h-5 mr-2' /> 월드컵 만들기
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='py-2.5 cursor-pointer' onClick={() => signOut()}>
          <LogOut className='w-5 h-5 mr-2' /> 로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
