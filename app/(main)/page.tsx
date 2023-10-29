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

export default async function Page({ searchParams }: { searchParams: SearchParmas }) {
  const search = searchParams.search
  let type = (searchParams.type ?? 'all') as Type

  if (!(type === 'video' || type === 'image')) type = 'all'

  return (
    <>
      <div className='flex flex-col w-full px-2'>
        <div className='flex flex-col sm:flex-row items-center justify-center sm:pr-4 py-4 sm:gap-4'>
          <FilterCups />
          <SearchInput />
        </div>
      </div>

      <CupsWrapper type={type} search={search} />

      <ScrollTopButton />
    </>
  )
}

const CupsWrapper = async ({ type, search }: { type: Type; search: string }) => {
  const query = getQuery({
    page: 0,
    type,
    search,
  })

  const initialCups = (await db.cup.findMany(query)) as CupWithUser[]

  const session = await getSession()

  return <Cups initialCups={initialCups} session={session} type={type} search={search} />
}
