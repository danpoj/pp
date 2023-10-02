import { Children } from '@/types/type'
import Header from '@/components/header'

export default function Layout({ children }: Children) {
  return (
    <div className='h-screen'>
      <Header />
      <main className='max-w-[92rem] mx-auto'>{children}</main>
    </div>
  )
}
