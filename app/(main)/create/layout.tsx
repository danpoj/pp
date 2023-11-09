import CreatePage from '@/components/create/create-page'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Layout() {
  const session = await getSession()

  if (!session) redirect('/')

  return (
    <section className='h-full w-full sm:max-w-6xl mx-auto py-4 px-2 sm:px-6 flex flex-col items-center'>
      <CreatePage />
    </section>
  )
}
