import Tournament from '@/components/tournament'
import db from '@/lib/db'
import { notFound } from 'next/navigation'
import imageToBase64 from 'image-to-base64'

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
      items: true,
    },
  })

  if (!cup) return notFound()

  if (cup.type === 'IMAGE') {
    const promises = []

    for (let i = 0; i < cup.items.length; i++) {
      promises.push(imageToBase64(cup.items[i].url))
    }

    const urls = await Promise.all(promises)

    for (let i = 0; i < cup.items.length; i++) {
      cup.items[i].url = 'data:image/png;base64,' + urls[i]
    }
  }

  return (
    <div className='h-full'>
      <Tournament cup={cup} />
    </div>
  )
}
