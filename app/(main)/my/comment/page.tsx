import MyComments from '@/components/my-comments'
import { getSession } from '@/lib/auth'
import { getMyCommentPage } from '@/lib/query'
import { notFound, redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const user = await getMyCommentPage(session.user.id)

  if (!user) notFound()

  const commentsLength = user._count.cupComments + user._count.itemComments

  return (
    <section className='min-h-full px-2 pt-8 max-w-4xl mx-auto'>
      <span className='text-xl font-semibold tracking-tighter'>/ 내 댓글 ({commentsLength}개)</span>
      <MyComments user={user} />
    </section>
  )
}
