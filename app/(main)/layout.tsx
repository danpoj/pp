import { Children } from '@/types/type'
import Header from '@/components/header'
import { getSession } from '@/lib/auth'

export default async function Layout({ children }: Children) {
  const session = await getSession()

  return (
    <div className='h-screen w-full'>
      <Header session={session} />
      <main className='w-full h-full pt-12 -z-10'>{children}</main>
    </div>
  )
}
