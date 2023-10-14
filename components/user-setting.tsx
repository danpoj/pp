import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, MessageSquare, Settings, Swords, User2 } from 'lucide-react'
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
        <Image src={session.user.image!} alt='logged in user image' fill className='dark:bg-white object-cover' />
        <div aria-hidden className='absolute bg-black inset-0 rounded-full opacity-5 hidden group-hover:block' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-72 text-primary/60 p-2 hidden sm:block'>
        <DropdownMenuLabel className='flex gap-2 items-center'>
          <div className='relative w-12 h-12 rounded-full overflow-hidden'>
            <Image src={session.user.image!} alt='logged in user image' fill className=' dark:bg-white object-cover' />
          </div>
          <span className='text-xs font-mono'>@{session.user.nickname}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='py-2.5 cursor-pointer' asChild>
          <Link href='/my/cup'>
            <Swords className='w-4 h-4 mr-2' /> 내 월드컵
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='py-2.5 cursor-pointer' asChild>
          <Link href='/my/comment'>
            <MessageSquare className='w-4 h-4 mr-2' /> 내 댓글
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
