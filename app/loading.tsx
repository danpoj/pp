import { pingping } from '@/data/pingping'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className='h-full p-2 flex items-center justify-center'>
      <Image src={pingping} alt='pingping logo' width={40} height={40} className='animate-spin' />
    </div>
  )
}
