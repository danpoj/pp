import Tournament from '@/components/tournament'
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
      items: true,
    },
  })

  if (!cup) return notFound()

  return (
    <div className='h-full'>
      <Tournament cup={cup} />
    </div>
  )
}
