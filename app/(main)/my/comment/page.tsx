import MyComments from '@/components/my-comments'
import NoItemPage from '@/components/no-item-page'
import { getSession } from '@/lib/auth'
import { getMyCommentPage } from '@/lib/query'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const user = await getMyCommentPage(session.user.id)

  if (!user) redirect('/')

  const commentsLength = user._count.cupComments + user._count.itemComments

  if (commentsLength === 0) {
    return <NoItemPage href='/' linkText='홈으로 이동' text='작성한 댓글이 없습니다' />
  }

  return (
    <section className='min-h-full px-2 pt-8 max-w-4xl mx-auto'>
      <span className='text-xl font-semibold tracking-tighter'>/ 내 댓글 ({commentsLength}개)</span>
      <MyComments user={user} />
    </section>
  )
}
