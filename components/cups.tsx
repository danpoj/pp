'use client'

import { BlurredImage } from '@/components/blurred-image'
import { ClipboardButton } from '@/components/clipboard-button'
import LikeButton from '@/components/like-button'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Cup, Like, User } from '@prisma/client'
import axios from 'axios'
import { ArrowRight, Loader2, MessageSquare, YoutubeIcon } from 'lucide-react'
import type { Session } from 'next-auth'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ResponsiveMasonry } from 'react-responsive-masonry'

const Masonry = dynamic(() => import('react-responsive-masonry'), {
  ssr: false,
})

type Type = 'all' | 'video' | 'image'

type CupWithUser = Cup & {
  _count: {
    items: number
    comments: number
    likes: number
  }
  user: User
  likes: Like[]
}

type Props = {
  initialCups: CupWithUser[]
  session: Session | null
  isLiked?: boolean
  type?: Type
  search?: string
}

export default function Cups({ initialCups, session, isLiked = false, type = 'all', search }: Props) {
  const [cups, setCups] = useState<CupWithUser[]>(initialCups)
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const page = useRef(1)

  const { ref, inView } = useInView({
    threshold: 1,
  })

  const getCups = async () => {
    try {
      setIsLoading(true)

      const { data } = (await axios.get(
        `/api/cup?isLiked=${isLiked}&type=${type}&page=${page.current}&search=${search}`
      )) as {
        data: CupWithUser[]
      }

      if (data.length === 0) {
        setIsFinished(true)
        return
      }

      setCups((prev) => [...prev, ...data])
      page.current++
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (inView && !isFinished && !isLoading) {
      getCups()
    }
  }, [inView])

  useEffect(() => {
    setCups(initialCups)
  }, [type, initialCups])

  return (
    <section className='px-2'>
      <ResponsiveMasonry
        className='px-1 w-full'
        columnsCountBreakPoints={{ 0: 1, 440: 2, 720: 3, 1100: 4, 1400: 5, 1700: 6 }}
      >
        <Masonry gutter='4px' className='pb-20 w-full'>
          {cups.map((cup, index) => (
            <div
              key={cup.id}
              ref={index === cups.length - 1 ? ref : null}
              className='rounded-lg overflow-hidden shadow dark:bg-border/20 border'
            >
              <Link href={`/cup/${cup.id}`} className='hover:opacity-90 transition group'>
                <div className='relative overflow-hidden'>
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
                    <div className='absolute left-2 top-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-xs text-[10px] px-2 py-1 rounded text-white font-bold'>
                      이미지
                    </div>
                  )}
                </div>
              </Link>
              <div className='h-full flex flex-col px-1 pt-2 pb-1.5 break-all gap-1'>
                <h2 className='font-bold'>{cup.title}</h2>
                <h3 className='text-xs text-primary/50 font-medium'>{cup.description}</h3>

                <div className='flex items-center gap-1 my-2'>
                  <Image
                    src={cup.user.image!}
                    alt='cup author profile image'
                    width={24}
                    height={24}
                    className='bg-white rounded-full w-[24px] h-[24px] object-cover'
                  />
                  <span className='text-xs font-normal'>@{cup.user.nickname}</span>
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
                    href={`/cup/${cup.id}/ranking`}
                    className={cn(buttonVariants({ className: 'text-xs text-[11px] px-2 flex-1', size: 'sm' }), 'h-8')}
                  >
                    랭킹보기 <ArrowRight className='w-3 h-3 ml-1' />
                  </Link>
                  <ClipboardButton path={`/cup/${cup.id}`} />
                  {/* TODO */}
                  <LikeButton cup={cup} session={session} className='flex items-center gap-1 flex-1' />
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {isFinished ? (
        <div className='w-full flex items-center justify-center pb-6'>총 {cups.length}개의 컨텐츠 불러오기 완료</div>
      ) : (
        <div className='w-full flex items-center justify-center'>
          <Loader2 className='animate-spin w-10 h-10' />
        </div>
      )}
    </section>
  )
}
