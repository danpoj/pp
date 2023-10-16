type Props = {
  description: string | null
}

export default function DescriptionText({ description }: Props) {
  if (!description) return null

  return (
    <span className='absolute top-[16%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl sm:text-3xl sm:py-2 sm:px-4 bg-black/50 py-1 px-3 rounded font-semibold text-white text-center pointer-events-none min-w-[80%]'>
      {description}
    </span>
  )
}
