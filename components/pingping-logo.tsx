import Image from 'next/image'
import Link from 'next/link'

export default function PingpingLogo() {
  return (
    <Link href='/' className='flex items-center gap-1'>
      <Image
        unoptimized
        src='/loader.gif'
        alt='pingping logo'
        width={26}
        height={26}
        className='w-[26px] h-[26px] object-contain'
        priority
      />
      <h1 className='font-bold'>
        Ping
        <span className='bg-fancy text-transparent bg-clip-text'>Ping</span>
        <span className='sr-only'>이상형 월드컵</span>
      </h1>
    </Link>
  )
}
