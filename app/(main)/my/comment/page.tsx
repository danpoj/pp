import MyComments from '@/components/my-comments'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      _count: true,
      cupComments: {
        include: {
          cup: true,
        },
      },
      itemComments: {
        include: {
          item: true,
        },
      },
    },
  })

  if (!user) redirect('/')

  return (
    <div className='min-h-full px-2 pt-8 max-w-4xl mx-auto'>
      <span className='text-2xl font-semibold tracking-tighter'>
        내 댓글 ({user._count.cupComments + user._count.itemComments}개)
      </span>
      <MyComments user={user} />
    </div>
  )
}
