import Cups from '@/components/cups'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'

export default async function Page() {
  const initialCups = await db.cup.findMany({
    skip: 0,
    take: 24,

    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: true,
      user: true,
      likes: true,
    },
  })

  const session = await getSession()

  return <Cups initialCups={initialCups} session={session} />
}
