import CreatePage from '@/components/create/create-page'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (!session) redirect('/')

  return (
    <section className='h-full w-full sm:max-w-6xl mx-auto py-4 px-2 sm:px-6 flex flex-col items-center'>
      {children}
    </section>
  )
}
