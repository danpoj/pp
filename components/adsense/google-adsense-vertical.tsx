import { cn } from '@/lib/utils'

export default function GoogleAdsenseVertical({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <ins
        className='adsbygoogle'
        style={{
          display: 'inline-block',
          width: '200px',
          height: '780px',
        }}
        data-ad-client='ca-pub-3412419424653583'
        data-ad-slot='7756210289'
      ></ins>
    </div>
  )
}
