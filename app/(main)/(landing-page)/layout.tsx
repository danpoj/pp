import GoogleAdsense from '@/components/adsense/google-adsense'
import FilterCups from '@/components/filter-cups'
import PWAInstallButton from '@/components/pwa-install-button'
import ScrollTopButton from '@/components/scroll-top-button'
import SearchInput from '@/components/search-input'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plane } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='flex flex-col w-full px-2'>
        <div className='flex flex-col md:flex-row mt-4'>
          <GoogleAdsense className='border max-h-[16rem] md:max-h-[32rem]' />
          <GoogleAdsense className='border max-h-[16rem] md:max-h-[32rem]' />
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-center sm:pr-4 py-4 sm:gap-4'>
          <div className='flex items-center gap-2'>
            <div className='flex flex-col gap-2'>
              <PWAInstallButton className='text-xs font-black text-[11px]' />
              <Link
                href='https://tally.so/r/wzMa5g'
                className={cn(
                  buttonVariants({
                    className: 'text-xs text-[11px]',
                    variant: 'secondary',
                    size: 'sm',
                  }),
                  'font-black'
                )}
              >
                <Plane className='w-4 h-4 mr-1 fill-blue-400 stroke-blue-400' /> 설문 / 문의
              </Link>
            </div>
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
