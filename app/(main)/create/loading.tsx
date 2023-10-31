import Image from 'next/image'

export default function Loading() {
  return (
    <div className='h-full p-2 flex items-center justify-center'>
      <Image
        unoptimized
        src='/loader.gif'
        alt='pingping logo'
        width={120}
        height={120}
        className='w-[120px] h-[120px] object-contain'
        priority
      />
    </div>
  )
}
