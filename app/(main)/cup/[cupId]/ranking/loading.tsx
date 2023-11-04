import Image from 'next/image'

export default function Loading() {
  return (
    <div className='h-full p-2 flex items-center justify-center'>
      <Image
        unoptimized
        src='/loader.gif'
        alt='pingping logo'
        width={100}
        height={100}
        className='w-[100px] h-[100px] object-contain'
        priority
      />
    </div>
  )
}
