import Cups from '@/components/cups'

import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { getQuery } from '@/lib/get-query'
import type { Cup, Like, User } from '@prisma/client'

export type Type = 'all' | 'video' | 'image'

type SearchParmas = {
  type: string
  search: string
}

type CupWithUser = Cup & {
  _count: {
    items: number
    comments: number
    likes: number
  }
  user: User
  likes: Like[]
}

export default async function Page({ searchParams }: { searchParams: SearchParmas }) {
  const search = searchParams.search
  let type = (searchParams.type ?? 'all') as Type

  if (!(type === 'video' || type === 'image')) type = 'all'

  const query = getQuery({
    page: 0,
    type,
    search,
  })

  const initialCups = (await db.cup.findMany(query)) as CupWithUser[]

  const session = await getSession()

  return <Cups key={type + search} initialCups={initialCups} session={session} type={type} search={search} />
}
