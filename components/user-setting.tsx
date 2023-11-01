import HeartEmoji from '@/components/heart-emoji'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, MessageSquare, Swords, User2 } from 'lucide-react'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  session: Session
}

export default function UserSetting({ session }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full select-none group relative overflow-hidden w-8 h-8'>
        <Image
          unoptimized
          src={session.user.image!}
          alt='logged in user image'
          width={40}
          height={40}
          className='dark:bg-white object-cover aspect-square'
        />
        <div aria-hidden className='absolute bg-black inset-0 rounded-full opacity-5 hidden group-hover:block' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-72  p-2 hidden sm:block'>
        <DropdownMenuLabel className='flex gap-2 items-center'>
          <div className='relative w-12 h-12 rounded-full overflow-hidden'>
            <Image
              unoptimized
              src={session.user.image!}
              alt='logged in user image'
              width={60}
              height={60}
              className='dark:bg-white object-cover aspect-square'
            />
          </div>
          <span className='text-xs font-mono'>@{session.user.nickname}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className='flex'>
          <DropdownMenuItem className='py-2.5 cursor-pointer flex-1 flex justify-center' asChild>
            <Link href='/my/cup'>
              <Swords className='w-4 h-4 mr-2' /> 내 월드컵
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className='py-2.5 cursor-pointer flex-1 flex justify-center' asChild>
            <Link href='/my/comment'>
              <MessageSquare className='w-4 h-4 mr-2' /> 내 댓글
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuItem className='py-2.5 cursor-pointer flex-1 flex justify-center gap-1' asChild>
          <Link href='/my/likes'>
            <HeartEmoji className='w-4 h-4 fill-red-500 stroke-red-500' /> 좋아요
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='py-2.5 cursor-pointer' asChild>
          <Link href='/setting'>
            <User2 className='w-4 h-4 mr-2' /> 설정
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='py-2.5 cursor-pointer' onClick={() => signOut()}>
          <LogOut className='w-4 h-4 mr-2' /> 로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
