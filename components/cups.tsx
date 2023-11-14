'use client'

import { BlurredImage } from '@/components/blurred-image'
import { ClipboardButton } from '@/components/clipboard-button'
import LikeButton from '@/components/like-button'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CupWithUser, TypeCupSearchParams } from '@/types/type'
import { BarChart, MessageSquare, YoutubeIcon } from 'lucide-react'
import type { Session } from 'next-auth'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ResponsiveMasonry } from 'react-responsive-masonry'
import Loader from './loader'
import GoogleAdsense from './adsense/google-adsense'
const Masonry = dynamic(() => import('react-responsive-masonry'), {
  ssr: false,
})

type Props = {
  count: number
  initialCups: CupWithUser[]
  session: Session | null
  isLiked?: boolean
  type?: TypeCupSearchParams
  search?: string
}

export default function Cups({ count, initialCups, session, isLiked = false, type = 'all', search }: Props) {
  const [cups, setCups] = useState<CupWithUser[]>(initialCups)
  const [isFinished, setIsFinished] = useState(initialCups.length === count)
  const [isLoading, setIsLoading] = useState(false)
  const page = useRef(1)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  const getCups = useCallback(async () => {
    try {
      setIsLoading(true)

      const newCups = await fetch(
        `/api/cup?isLiked=${isLiked}&type=${type}&page=${page.current++}&search=${search}`
      ).then((res) => res.json())

      setCups((prev) => [...prev, ...newCups])

      if (cups.length + newCups.length === count) {
        setIsFinished(true)
      }
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [count, cups.length, isLiked, search, type])

  useEffect(() => {
    if (inView && !isFinished && !isLoading) {
      getCups()
    }
  }, [inView, isFinished, isLoading, getCups])

  return (
    <section className='sm:px-2 pb-20'>
      <ResponsiveMasonry
        className='px-1 w-full'
        columnsCountBreakPoints={{ 0: 1, 560: 2, 850: 3, 1200: 4, 1500: 5, 1800: 6 }}
      >
        <Masonry gutter='2px' className='pb-20 w-full'>
          {cups.map((cup, index) => (
            <WorldCup key={cup.id} cup={cup} session={session} index={index} />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {isFinished ? (
        <div className='w-full flex items-center justify-center pb-6 flex-col gap-2 mt-20 mb-20'>
          <span className='text-lg font-bold'>{search == null ? '' : `검색어: ${search}`}</span>
          <span>총 {cups.length}개의 컨텐츠 불러오기 완료</span>
        </div>
      ) : (
        <div ref={ref} className='flex items-center justify-center mx-auto w-fit'>
          <Loader size='md' />
        </div>
      )}
    </section>
  )
}

function WorldCup({ cup, session, index }: { cup: CupWithUser; session: Session | null; index: number }) {
  return (
    <div key={cup.id} className='rounded-lg overflow-hidden shadow dark:bg-border/20 border h-fit'>
      <Link target='_blank' prefetch={false} href={`/cup/${cup.id}`} className='hover:opacity-90 transition group'>
        <div className='relative overflow-hidden flex items-center justify-center max-h-[24rem]'>
          {cup.thumbnail ? (
            <BlurredImage
              thumbnail={cup.thumbnail}
              title={cup.title}
              width={cup.thumbnailWidth}
              height={cup.thumbnailHeight}
              type={cup.type}
            />
          ) : (
            <div>no image.</div>
          )}

          {cup.type === 'VIDEO' ? (
            <div className='absolute left-2 top-2 bg-[#f00] text-xs text-[10px] px-2 py-1 rounded text-white font-bold flex gap-1 capitalize'>
              <YoutubeIcon className='w-4 h-4' /> 유튜브
            </div>
          ) : (
            <div className='absolute left-2 top-2 bg-fancy text-xs text-[10px] px-2 py-1 rounded text-white font-bold'>
              이미지
            </div>
          )}
        </div>
      </Link>
      <div className='h-full flex flex-col px-1 pt-2 pb-1.5 break-all gap-1'>
        <h2 className='font-bold text-xs sm:text-base px-1'>{cup.title}</h2>
        <h3 className='text-xs text-[0.65rem] sm:text-[0.75rem] text-primary/60 px-1'>{cup.description}</h3>

        <div className='flex items-center gap-1 my-2 px-1'>
          <div className='rounded-full overflow-hidden'>
            <Image
              unoptimized
              src={cup.user.image!}
              alt='cup author profile image'
              width={18}
              height={18}
              className='bg-white w-[18px] h-[18px] object-cover'
            />
          </div>
          <span className='text-xs font-normal ml-1'>@{cup.user.nickname}</span>
        </div>

        <div className='mb-2 flex gap-2 ml-1 font-normal'>
          <p className='text-xs'>
            {cup.type === 'IMAGE' ? '이미지' : '유튜브 영상'}{' '}
            <span className={`${cup.type === 'IMAGE' ? 'text-blue-500' : 'text-red-500'} font-bold`}>
              {cup._count.items}개
            </span>
          </p>

          <p className='text-xs flex gap-1 items-center'>
            <MessageSquare className='w-3 h-3' /> 댓글 {cup._count.comments}개
          </p>
        </div>

        <div className='flex items-center gap-1'>
          <Link
            target='_blank'
            href={`/cup/${cup.id}/ranking`}
            className={cn(buttonVariants({ className: 'text-xs text-[11px] px-2 flex-1', size: 'sm' }), 'h-8')}
          >
            <span className='hidden sm:block'>랭킹</span>
            <span className='block sm:hidden text-[0.65rem]'>랭킹</span>
            <BarChart className='w-3 h-3 hidden sm:block ml-1' />
          </Link>
          <ClipboardButton path={`/cup/${cup.id}`} />

          <LikeButton cup={cup} session={session} className='flex items-center gap-1 flex-1' />
        </div>
      </div>
    </div>
  )
}
