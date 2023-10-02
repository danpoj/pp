import { pingpingLogo } from '@/data/images'
import Image from 'next/image'
import Link from 'next/link'

export default function PingpingLogo() {
  return (
    <Link href='/' className='flex items-center gap-1'>
      <Image src={pingpingLogo} alt='pingping logo' width={26} height={26} />
      <h1 className='font-bold'>
        Ping
        <span className='bg-fancy text-transparent bg-clip-text'>Ping</span>
      </h1>
    </Link>
  )
}
