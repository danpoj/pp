export default function CupInformation({ title, index, limit }: { title: string; index: number; limit: number }) {
  return (
    <div className='bg-black/70 w-full h-14 fixed top-0 z-50 mt-12 text-white flex gap-3 items-center justify-center px-2'>
      <h1 className='text-sm sm:text-lg truncate'>{title}</h1>
      <p className='text-base sm:text-2xl font-semibold ml-2 shrink-0'>
        <span className='text-base sm:text-2xl font-semibold mr-1'>{limit === 1 ? '결승전' : limit * 2 + '강'}</span>(
        {index + 1}/{limit})
      </p>
    </div>
  )
}
