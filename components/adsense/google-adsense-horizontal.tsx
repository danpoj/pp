import { cn } from '@/lib/utils'

export default function GoogleAdsenseHorizontal({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client='ca-pub-3412419424653583'
        data-ad-slot='4111552703'
        data-ad-format='auto'
        data-full-width-responsive='true'
      ></ins>
    </div>
  )
}
