import Cups from '@/components/cups'
import FilterCups from '@/components/filter-cups'
import ScrollTopButton from '@/components/scroll-top-button'
import SearchInput from '@/components/search-input'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { getQuery } from '@/lib/get-query'
import type { Cup, Like, User } from '@prisma/client'
import { Suspense } from 'react'

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

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  let type = (searchParams.type ?? 'all') as Type
  const search = searchParams.search

  if (!(type === 'video' || type === 'image')) type = 'all'

  const query = getQuery({
    page: 0,
    type,
    search,
  })

  const initialCups = (await db.cup.findMany(query)) as CupWithUser[]

  const session = await getSession()

  return (
    <>
      <div className='flex flex-col w-full px-2'>
        {/* <CoupangDynamicBanner1 /> */}

        <div className='flex items-center justify-center pr-4 py-4 gap-4'>
          <FilterCups />
          <SearchInput />
        </div>
      </div>

      <Suspense fallback={null}>
        <Cups initialCups={initialCups} session={session} type={type} search={search} />
      </Suspense>

      <ScrollTopButton />
    </>
  )
}
