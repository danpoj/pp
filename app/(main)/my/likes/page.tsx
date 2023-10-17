import Cups from '@/components/cups'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { redirect } from 'next/navigation'
import type { Cup, Like, User } from '@prisma/client'

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const initialCups = await db.cup.findMany({
    skip: 0,
    take: 24,

    where: {
      likes: {
        some: {
          userId: session.user.id,
        },
      },
    },

    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: true,
      user: true,
      likes: true,
    },
  })

  return <Cups initialCups={initialCups} session={session} isLiked />
}
