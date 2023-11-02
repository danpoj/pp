import FilterCups from '@/components/filter-cups'
import PWAInstallButton from '@/components/pwa-install-button'
import ScrollTopButton from '@/components/scroll-top-button'
import SearchInput from '@/components/search-input'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='flex flex-col w-full px-2'>
        <div className='flex flex-col lg:flex-row items-center justify-center sm:pr-4 py-4 sm:gap-4'>
          <div className='flex items-center gap-2'>
            <PWAInstallButton className='text-xs font-black text-[11px]' />
            <FilterCups />
          </div>
          <SearchInput />
        </div>
      </div>

      {children}

      <ScrollTopButton />
    </>
  )
}
