'use client'

import GoogleAdsense from '@/components/adsense/google-adsense'
import GoogleAdsenseHorizontal from '@/components/adsense/google-adsense-horizontal'
import GoogleAdsenseVertical from '@/components/adsense/google-adsense-vertical'

export default function Page() {
  return (
    <div className='w-full h-full flex flex-wrap'>
      {new Array(4).fill(undefined).map((_, i) => (
        <GoogleAdsense key={i} className='border aspect-square max-w-[30rem]' />
      ))}

      <GoogleAdsense className='border aspect-video max-w-[30rem]' />
      <GoogleAdsense className='border aspect-video max-w-[30rem]' />
      <GoogleAdsense className='border aspect-video max-w-[30rem]' />

      <GoogleAdsense className='border aspect-auto max-w-[22rem]' />
      <GoogleAdsense className='border aspect-auto max-w-[22rem]' />
      <GoogleAdsense className='border aspect-auto max-w-[22rem]' />
      <GoogleAdsense className='border aspect-auto max-w-[22rem]' />
    </div>
  )
}
