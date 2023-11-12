import Cups from '@/components/cups'

import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { getQuery } from '@/lib/get-query'
import { CupSearchParmas, CupWithUser, TypeCupSearchParams } from '@/types/type'

export default async function Page({ searchParams }: { searchParams: CupSearchParmas }) {
  const search = searchParams.search
  let type = (searchParams.type ?? 'all') as TypeCupSearchParams

  if (!(type === 'video' || type === 'image')) type = 'all'

  const query = getQuery({
    page: 0,
    type,
    search,
  })

  const [initialCups, count, session] = await Promise.all([
    db.cup.findMany(query),
    db.cup.count({
      where: {
        AND: [
          {
            ...(search !== 'undefined'
              ? {
                  title: {
                    contains: search,
                  },
                }
              : {}),
          },
          {
            ...(type === 'image' ? { type: 'IMAGE' } : {}),
            ...(type === 'video' ? { type: 'VIDEO' } : {}),
          },
        ],
      },
    }),
    getSession(),
  ])

  return (
    <Cups
      key={type + search}
      count={count}
      initialCups={initialCups as CupWithUser[]}
      session={session}
      type={type}
      search={search}
    />
  )
}
