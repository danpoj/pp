import { cn } from '@/lib/utils'
import GoogleAdsense from './adsense/google-adsense'

export default function CupInformation({
  title,
  index,
  limit,
  isHidingHeader,
}: {
  title: string
  index: number
  limit: number
  isHidingHeader: boolean
}) {
  return (
    <div
      className={cn(
        'bg-black/50 w-full py-2 fixed top-0 z-50 text-white flex flex-col md:flex-row gap-3 items-center justify-center pl-2 pr-12 pointer-events-none overflow-hidden',
        isHidingHeader ? '' : 'mt-12'
      )}
    >
      <GoogleAdsense className='h-16 min-w-[260px] max-w-[340px] border shrink-0' />

      <div className='flex'>
        <h2 className='text-sm sm:text-base truncate shrink'>{title}</h2>
        <p className='text-base sm:text-lg font-semibold ml-2 shrink-0 text-red-200'>
          <span className='mr-1'>{limit === 1 ? '결승전' : limit * 2 + '강'}</span>({index + 1}/{limit})
        </p>
      </div>
    </div>
  )
}
