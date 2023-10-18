import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import { pingpingLogo } from '@/data/images'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className='h-full w-full p-2'>
      <div className='flex gap-2 h-full w-full flex-col md:flex-row'>
        <Skeleton className='flex-1 relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            {/* <Loader2 className='w-10 h-10 animate-spin text-primary/30' /> */}
            <Image src={pingpingLogo} alt='pingping logo' width={40} height={40} className='animate-spin' />
          </div>
        </Skeleton>
        <Skeleton className='flex-1 relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <Image src={pingpingLogo} alt='pingping logo' width={40} height={40} className='animate-spin' />
            {/* <Loader2 className='w-10 h-10 animate-spin text-primary/30' /> */}
          </div>
        </Skeleton>
      </div>
    </div>
  )
}
