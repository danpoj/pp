import MyCups from '@/components/my-cups'
import NoItemPage from '@/components/no-item-page'
import { getSession } from '@/lib/auth'
import { getMyCupPage } from '@/lib/query'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const cups = await getMyCupPage(session.user.id)

  if (!cups) {
    return <NoItemPage href='/create' linkText='월드컵 만들기' text='내 월드컵이 없습니다' />
  }

  return (
    <section className='min-h-full px-2 pt-8 max-w-4xl mx-auto'>
      <span className='text-xl font-semibold tracking-tighter'>/ 내 월드컵 ({cups.length}개)</span>
      <MyCups cups={cups} />
    </section>
  )
}
