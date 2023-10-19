import db from '@/lib/db'
import { ImageResponse } from 'next/server'

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
    cup ? (
      <img src={cup.thumbnail} alt={cup.title} className='w-full h-full absolute inset-0 object-cover' />
    ) : (
      //   <div
      //     style={{
      //       backgroundImage: `url('${cup?.thumbnail}')`,
      //       backgroundSize: 'contain',
      //       backgroundRepeat: 'no-repeat',
      //       backgroundColor: '#000',

      //       fontSize: 12,

      //       width: '100%',
      //       height: '100%',
      //       display: 'flex',
      //       alignItems: 'center',
      //       justifyContent: 'center',
      //     }}
      //   >
      //     {cup?.title}
      //   </div>
      <div
        style={{
          fontSize: 12,

          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        pingping 월드컵
      </div>
    ),
    {
      ...size,
    }
  )
}
