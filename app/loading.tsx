import Loader from '@/components/loader'

export default function Loading() {
  return (
    <div className='h-full flex items-center justify-center'>
      <Loader size='md' />
    </div>
  )
}
