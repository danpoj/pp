import GoogleAdsense from '@/components/adsense/google-adsense'

export default function Page() {
  return (
    <div className='w-full h-full grid sm:grid-cols-2 xl:grid-cols-3'>
      {new Array(100).fill(undefined).map((_, i) => (
        <GoogleAdsense key={i} className='border h-32' />
      ))}
    </div>
  )
}
