import MobileMenu from '@/components/mobile-menu'
import PingpingLogo from '@/components/pingping-logo'
import { ThemeMenu } from '@/components/theme-menu'
import UserSetting from '@/components/user-setting'
import type { Session } from 'next-auth'
import HeaderSignButtons from './header-sign-buttons'
import HeaderButtons from './header-buttons'

type Props = {
  session: Session | null
}

export default function Header({ session }: Props) {
  return (
    <header className='fixed w-full px-3 h-12 flex justify-between items-center bg-background/90 z-50 backdrop-blur-sm'>
      <div className='flex items-center gap-2 sm:gap-4'>
        <PingpingLogo />
        <HeaderButtons session={session} />
      </div>

      <div className='flex items-center gap-2'>
        <div className='block sm:hidden'>
          <ThemeMenu />
        </div>
        <MobileMenu session={session} />

        <aside className='hidden sm:flex sm:gap-2 sm:items-center'>
          <ThemeMenu />
          {session ? <UserSetting session={session} /> : <HeaderSignButtons />}
        </aside>
      </div>
    </header>
  )
}
