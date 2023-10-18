import { pingpingLogo } from '@/data/images'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className='h-full p-2 flex items-center justify-center'>
      <Image src={pingpingLogo} alt='pingping logo' width={40} height={40} className='animate-spin' />
    </div>
  )
}
