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

  const initialCups = (await db.cup.findMany(query)) as CupWithUser[]

  const session = await getSession()

  return <Cups key={type + search} initialCups={initialCups} session={session} type={type} search={search} />
}
