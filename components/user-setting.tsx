import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, MessageSquare, Star, Swords, User2 } from 'lucide-react'
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
      <DropdownMenuTrigger className='rounded-full select-none group relative overflow-hidden w-7 h-7 outline outline-2 outline-offset-1 outline-primary/70'>
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
      <DropdownMenuContent align='end' className='w-64  p-2 hidden sm:block'>
        <DropdownMenuLabel className='flex gap-2 items-center'>
          <div className='relative w-12 h-12 rounded-full overflow-hidden outline outline-2 outline-offset-1 outline-primary/70'>
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
            <Star className='w-4 h-4 fill-yellow-300 stroke-yellow-600' /> 스크랩
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='h-9 text-xs cursor-pointer flex-1' asChild>
          <Link href='/setting'>
            <User2 className='w-4 h-4 mr-2' /> 설정
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='text-xs cursor-pointer' onClick={() => signOut()}>
          <LogOut className='w-4 h-4 mr-2' /> 로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
