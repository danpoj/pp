import Cups from '@/components/cups'
import db from '@/lib/db'

export default async function Page() {
  const initialCups = await db.cup.findMany({
    skip: 0,
    take: 20,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-2 gap-1'>
      <Cups initialCups={initialCups} />
    </div>
  )
}
