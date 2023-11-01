import MyCups from '@/components/my-cups'
import { getSession } from '@/lib/auth'
import { getMyCupPage } from '@/lib/query'
import { notFound, redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const cups = await getMyCupPage(session.user.id)

  if (!cups) notFound()

  return (
    <section className='min-h-full px-2 pt-8 max-w-4xl mx-auto'>
      <span className='text-xl font-semibold tracking-tighter'>/ 내 월드컵 ({cups.length}개)</span>
      <MyCups cups={cups} />
    </section>
  )
}
