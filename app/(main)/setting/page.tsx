import UserAvatarForm from '@/components/user-avatar-form'
import UserNicknameForm from '@/components/user-nickname-form'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { redirect } from 'next/navigation'
import { v2 as cloudinary } from 'cloudinary'

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

  const cld: Cld = await cloudinary.search.expression('folder:avatar').execute()
  const avatars = cld.resources.map((image) => image.secure_url)

  return (
    <div className='h-full max-w-6xl mx-auto flex flex-col items-center pt-10'>
      <UserAvatarForm user={user} avatars={avatars} />

      {/* <UserNicknameForm user={user} /> */}
    </div>
  )
}
