import UserAvatarForm from '@/components/user-avatar-form'
import UserNicknameForm from '@/components/user-nickname-form'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { redirect } from 'next/navigation'

type Cld = {
  total_count: number
  resources: {
    secure_url: string
  }[]
}

export default async function Page() {
  const session = await getSession()

  if (!session) redirect('/')

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!user) redirect('/')

  return (
    <div className='h-full max-w-6xl mx-auto flex flex-col items-center pt-20 gap-16'>
      <UserAvatarForm user={user} />

      <UserNicknameForm user={user} />
    </div>
  )
}
