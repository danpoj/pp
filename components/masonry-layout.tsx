import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'
import { ResponsiveMasonry } from 'react-responsive-masonry'
const Masonry = dynamic(() => import('react-responsive-masonry'), {
  ssr: false,
})

export default function MasonryLayout({ children }: { children: ReactNode }) {
  return (
    <ResponsiveMasonry className='px-1 w-full' columnsCountBreakPoints={{ 0: 2, 760: 3, 1100: 4, 1400: 5, 1700: 6 }}>
      <Masonry gutter='2px' className='pb-20 w-full'>
        {children}
      </Masonry>
    </ResponsiveMasonry>
  )
}
