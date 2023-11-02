import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

export default function PWAInstallButton({ className }: { className?: string }) {
  return (
    <Link href='/install' className={cn(buttonVariants({ size: 'sm' }), className)}>
      Ping
      <span className='bg-fancy text-transparent bg-clip-text mr-1'>Ping</span>
      <span className='mr-1'>앱 설치</span>
      <Download className='w-3.5 h-3.5' />
      <span className='sr-only'>이상형 월드컵</span>
    </Link>
  )
}
