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
      <div className='flex flex-col-reverse md:flex-row p-4 gap-4 md:gap-8'>
        <FilterCups />

        <iframe
          src='https://ads-partners.coupang.com/widgets.html?id=720296&template=carousel&trackingCode=AF0905237&subId=&width=680&height=140&tsource='
          width='100%'
          height='140'
          frameBorder='0'
          scrolling='no'
          referrerPolicy='unsafe-url'
        ></iframe>
      </div>

      <Cups initialCups={initialCups} session={session} type={type} order={order} />
    </>
  )
}
