import CupRanking from '@/components/cup-ranking'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    cupId: string
  }
}

export async function generateMetadata(
  { params: { cupId } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const cup = await db.cup.findUnique({
    where: {
      id: cupId,
    },
  })

  if (!cup) return

  return {
    title: `PingPing 이상형 월드컵 랭킹페이지 | ${cup.title}`,
    description: cup.description,

    openGraph: {
      title: `PingPing 이상형 월드컵 랭킹페이지 | ${cup.title}`,
      description: cup.description,
      url: `https://www.pingping.online/cup/${cup.id}`,
      siteName: 'PingPing',
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: cup.thumbnail,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `PingPing 이상형 월드컵 랭킹페이지 | ${cup.title}`,
      description: cup.description,
      images: [cup.thumbnail],
    },
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
        include: {
          user: true,
        },
      },
      items: {
        orderBy: {
          winCount: 'desc',
        },
      },
      user: true,
    },
  })

  if (!cup) notFound()

  const session = await getSession()

  return (
    <section className='h-full max-w-7xl mx-auto p-2'>
      <CupRanking session={session} {...cup} />
    </section>
  )
}
