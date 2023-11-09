import Cups from '@/components/cups'
import NoItemPage from '@/components/no-item-page'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { getMyLikesPage } from '@/lib/query'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const initialCups = await getMyLikesPage(session.user.id)

  if (initialCups.length === 0) {
    return <NoItemPage href='/' linkText='홈으로 이동' text='스크랩 한 월드컵이 없습니다' />
  }

  const count = await db.cup.count({
    where: {
      likes: {
        some: {
          userId: session.user.id,
        },
      },
    },
  })

  return <Cups count={count} initialCups={initialCups} session={session} isLiked />
}
