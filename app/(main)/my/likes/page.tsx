import Cups from '@/components/cups'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import type { Cup, Like, User } from '@prisma/client'

type CupWithUser = Cup & {
  _count: {
    items: number
    comments: number
    likes: number
  }
  user: User
  likes: Like[]
}

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const initialCups = (await db.cup.findMany({
    skip: 0,
    take: 24,
    where: {
      likes: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      _count: true,
      user: true,
      likes: true,
    },
  })) as CupWithUser[]

  return <Cups initialCups={initialCups} session={session} isLiked />
}
