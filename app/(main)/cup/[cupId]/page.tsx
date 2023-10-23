import Tournament from '@/components/tournament'
import db from '@/lib/db'
import { Metadata, ResolvingMetadata } from 'next'
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
    title: `PingPing 이상형 월드컵 | ${cup.title}`,
    description: cup.description,

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
  const cup = await db.cup.findUnique({
    where: {
      id: cupId,
    },
    include: {
      items: true,
    },
  })

  if (!cup) return notFound()

  return (
    <section className='h-full'>
      <Tournament cup={cup} />
    </section>
  )
}

// if (cup.type === 'IMAGE') {
//   const promises = []

//   for (let i = 0; i < 3; i++) {
//     promises.push(imageToBase64(cup.items[i].url))
//   }

//   console.time('image')
//   const urls = await Promise.all(promises)
//   console.timeEnd('image')

//   for (let i = 0; i < 3; i++) {
//     cup.items[i].url = 'data:image/png;base64,' + urls[i]
//   }
// }

// const convertToBase64 = async (cup: Cup & { items: Item[] }) => {
//   const promises = []

//   for (let i = 0; i < cup.items.length; i++) {
//     promises.push(imageToBase64(cup.items[i].url))
//   }

//   const urls = await Promise.all(promises)

//   for (let i = 0; i < cup.items.length; i++) {
//     cup.items[i].url = 'data:image/png;base64,' + urls[i]
//   }
// }
