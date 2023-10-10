import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='h-full max-w-7xl mx-auto p-2'>
      <div className='flex gap-2'>
        <Skeleton className='w-1/3 h-[30rem]' />
        <Skeleton className='w-1/3 h-[30rem]' />
        <Skeleton className='w-1/3 h-[30rem]' />
      </div>
    </div>
  )
}
