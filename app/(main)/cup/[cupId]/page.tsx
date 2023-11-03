import Tournament from '@/components/tournament'
import db from '@/lib/db'
import { getCupPage } from '@/lib/query'
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
    title: cup.title,
    description: cup.description,
    keywords: ['이상형 월드컵', cup.title, cup.description],

    openGraph: {
      title: `PingPing 이상형 월드컵 | ${cup.title}`,
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
      title: `PingPing 이상형 월드컵 | ${cup.title}`,
      description: cup.description,
      images: [cup.thumbnail],
    },
  }
}

export default async function Page({ params: { cupId } }: Props) {
  const cup = await getCupPage(cupId)

  if (!cup) notFound()

  return <Tournament cup={cup} />
}
