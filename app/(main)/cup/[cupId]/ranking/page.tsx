import CupRanking from '@/components/cup-ranking'
import db from '@/lib/db'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    cupId: string
  }
}

export default async function Page({ params: { cupId } }: Props) {
  const cup = await db.cup.findUnique({
    where: {
      id: cupId,
    },
    include: {
      _count: true,
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      items: {
        orderBy: {
          winCount: 'desc',
        },
      },
    },
  })

  if (!cup) return notFound()

  return (
    <div className='h-full max-w-7xl mx-auto p-2'>
      <CupRanking {...cup} />
    </div>
  )
}
