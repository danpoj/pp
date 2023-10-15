import MyCups from '@/components/my-cups'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const cups = await db.cup.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      _count: true,
    },
  })

  if (!cups) {
    return <div></div>
  }

  return (
    <div className='min-h-full px-2 pt-10'>
      <MyCups cups={cups} />
    </div>
  )
}
