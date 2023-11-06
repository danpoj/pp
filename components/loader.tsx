import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE = {
  sm: 30,
  md: 60,
  lg: 80,
}

export default function Loader({ size = 'md', className }: Props) {
  return (
    <Image
      unoptimized
      src='/loader.gif'
      width={SIZE[size]}
      height={SIZE[size]}
      alt='brand image'
      style={{
        width: SIZE[size],
      }}
      className={cn('object-contain aspect-square', className)}
      priority
    />
  )
}
