import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, Settings, User2 } from 'lucide-react'
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
      <DropdownMenuTrigger className='rounded-full select-none group relative'>
        <Image
          src={session.user.image!}
          alt='logged in user image'
          width={36}
          height={36}
          className='p-1 rounded-full border-[1.5px] border-slate-300 dark:bg-white'
        />
        <div aria-hidden className='absolute bg-black inset-0 rounded-full opacity-5 hidden group-hover:block' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-72 text-primary/60 p-2 hidden sm:block'>
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

        <DropdownMenuSeparator />

        <DropdownMenuItem className='py-2.5 cursor-pointer' asChild>
          <Link href={`/my/${session.user.nickname}`}>
            <User2 className='w-5 h-5 mr-2' /> 내 활동
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='py-2.5 cursor-pointer' asChild>
          <Link href='/setting'>
            <Settings className='w-5 h-5 mr-2' /> 설정
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='py-2.5 cursor-pointer' onClick={() => signOut()}>
          <LogOut className='w-5 h-5 mr-2' /> 로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
