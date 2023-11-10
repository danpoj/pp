import { cn } from '@/lib/utils'

export default function GoogleAdsenseHorizontal({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <ins
        className='adsbygoogle'
        style={{
          display: 'inline-block',
          width: '728px',
          height: '90px',
        }}
        data-ad-client='ca-pub-3412419424653583'
        data-ad-slot='1416078938'
      ></ins>
    </div>
  )
}
