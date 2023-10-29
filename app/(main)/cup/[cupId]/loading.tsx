import Image from 'next/image'

export default function Loading() {
  return (
    <div className='h-full p-2 flex items-center justify-center'>
      <Image src='/loader.gif' alt='pingping logo' width={120} height={120} />
    </div>
  )
}
