import MyCups from '@/components/my-cups'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { notFound, redirect } from 'next/navigation'

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

    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!cups) notFound()

  return (
    <section className='min-h-full px-2 pt-8 max-w-4xl mx-auto'>
      <span className='text-2xl font-semibold tracking-tighter'>내 월드컵 ({cups.length}개)</span>
      <MyCups cups={cups} />
    </section>
  )
}
