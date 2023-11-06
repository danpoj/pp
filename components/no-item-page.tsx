import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Loader from './loader'

type Props = {
  linkText: string
  text: string
  href: string
}

export default function NoItemPage({ href, linkText, text }: Props) {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-4 -mt-20'>
      <Link
        href={href}
        className={cn(
          buttonVariants({
            className: 'mb-6',
          })
        )}
      >
        {linkText}
        <ArrowRight className='w-5 h-5 ml-1' />
      </Link>

      <h2 className='text-xl'>{text}</h2>

      <Loader size='md' className='grayscale' />
    </div>
  )
}
