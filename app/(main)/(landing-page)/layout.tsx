import { ReactNode } from 'react'
import FilterCups from '@/components/filter-cups'
import ScrollTopButton from '@/components/scroll-top-button'
import SearchInput from '@/components/search-input'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='flex flex-col w-full px-2'>
        <div className='flex flex-col sm:flex-row items-center justify-center sm:pr-4 py-4 sm:gap-4'>
          <FilterCups />
          <SearchInput />
        </div>
      </div>

      {children}

      <ScrollTopButton />
    </>
  )
}
