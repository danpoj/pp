import Link from 'next/link'
import Loader from './loader'

export default function PingpingLogo() {
  return (
    <Link href='/' className='flex items-center gap-1'>
      <Loader size='sm' />
      <h1 className='font-bold'>
        Ping
        <span className='bg-fancy text-transparent bg-clip-text'>Ping</span>
        <span className='sr-only'>이상형 월드컵</span>
      </h1>
    </Link>
  )
}
