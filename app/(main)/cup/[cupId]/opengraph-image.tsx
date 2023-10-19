import db from '@/lib/db'
import { ImageResponse } from 'next/server'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params: { cupId } }: { params: { cupId: string } }) {
  const cup = await db.cup.findUnique({
    where: {
      id: cupId,
    },
    select: {
      thumbnail: true,
      title: true,
    },
  })

  return new ImageResponse(
    <img src={cup?.thumbnail} alt={cup?.title} className='w-full h-full object-contain' />,

    {
      ...size,
    }
  )
}
