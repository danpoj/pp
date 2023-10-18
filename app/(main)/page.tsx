import Cups from '@/components/cups'
import FilterCups from '@/components/filter-cups'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { getQuery } from '@/lib/get-query'
import { Cup, Like, User } from '@prisma/client'
import { Suspense } from 'react'

type Type = 'all' | 'video' | 'image'
type Order = 'popular' | 'like' | 'newest'
type CupWithUser = Cup & {
  _count: {
    items: number
    comments: number
    likes: number
  }
  user: User
  likes: Like[]
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  let type = (searchParams.type ?? 'all') as Type
  let order = (searchParams.order ?? 'polular') as Order

  if (!(type === 'all' || type === 'video' || type === 'image')) type = 'all'
  if (!(order === 'popular' || order === 'like' || order === 'newest')) order = 'popular'

  const query = getQuery({
    type,
    order,
  })

  const initialCups = (await db.cup.findMany(query)) as CupWithUser[]

  const session = await getSession()

  return (
    <>
      <FilterCups />

      <Cups initialCups={initialCups} session={session} type={type} order={order} />
    </>
  )
}
