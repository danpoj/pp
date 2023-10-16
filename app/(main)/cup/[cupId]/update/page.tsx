import CupUpdateForm from '@/components/cup-update-form'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    cupId: string
  }
}

export default async function Page({ params: { cupId } }: Props) {
  const session = await getSession()

  if (!session) redirect('/')

  const cup = await db.cup.findUnique({
    where: {
      id: cupId,
      userId: session.user.id,
    },
    include: {
      _count: true,
      items: true,
    },
  })

  if (!cup) return redirect('/')

  return (
    <div className='h-full max-w-5xl mx-auto p-2 pt-10'>
      <span className='text-2xl font-semibold block mb-10'>월드컵 수정하기</span>
      <CupUpdateForm cup={cup} />
    </div>
  )
}
