import { CoupangDynamicBanner1 } from '@/components/adsense/coupang-dynamic-banner'
import Cups from '@/components/cups'
import FilterCups from '@/components/filter-cups'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { getQuery } from '@/lib/get-query'
import type { Cup, Like, User } from '@prisma/client'

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
      <div className='flex flex-col-reverse md:flex-row px-8 py-12 gap-4 md:gap-8 w-full'>
        <FilterCups />

        <CoupangDynamicBanner1 />
      </div>

      <Cups initialCups={initialCups} session={session} type={type} order={order} />
    </>
  )
}
