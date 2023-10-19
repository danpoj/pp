import db from '@/lib/db'
import { ImageResponse } from 'next/server'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'PingPing'
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
    (
      <div
        style={{
          backgroundImage: `url("${cup?.thumbnail}")`,
          backgroundSize: 'contain',

          fontSize: 12,

          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {cup?.title}
      </div>
    ),
    {
      ...size,
    }
  )
}
