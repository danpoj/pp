import Cups from '@/components/cups'
import { getSession } from '@/lib/auth'
import { getMyLikesPage } from '@/lib/query'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const initialCups = await getMyLikesPage(session.user.id)

  return <Cups initialCups={initialCups} session={session} isLiked />
}
