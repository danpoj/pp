import { Children } from '@/types/type'
import Header from '@/components/header'
import { getSession } from '@/lib/auth'

export default async function Layout({ children }: Children) {
  const session = await getSession()

  return (
    <div className='h-screen'>
      <Header session={session} />
      <main className='max-w-[92rem] mx-auto'>{children}</main>
    </div>
  )
}
