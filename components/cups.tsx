'use client'

import { cn } from '@/lib/utils'
import type { Cup, Like, User } from '@prisma/client'
import axios from 'axios'
import { ArrowRight, Loader2, MessageSquare, YoutubeIcon } from 'lucide-react'
import type { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ResponsiveMasonry } from 'react-responsive-masonry'
import { BlurredImage } from './blurred-image'
import { ClipboardButton } from './clipboard-button'
import LikeButton from './like-button'
import { buttonVariants } from './ui/button'
import dynamic from 'next/dynamic'

const Masonry = dynamic(() => import('react-responsive-masonry'), {
  ssr: false,
})

type Type = 'all' | 'video' | 'image'
type Order = 'popular' | 'like' | 'newest'
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
  order?: Order
}

export default function Cups({ initialCups, session, isLiked = false, type = 'all', order = 'popular' }: Props) {
  const [cups, setCups] = useState<CupWithUser[]>(initialCups)
  const [isFinished, setIsFinished] = useState(initialCups.length < 24)

  const { ref, inView } = useInView({
    threshold: 1,
  })

  const getCups = async () => {
    const lastCupId = cups[cups.length - 1].id

    const { data } = (await axios.get(
      `/api/cup?lastCupId=${lastCupId}&isLiked=${isLiked}&type=${type}&order=${order}`
    )) as { data: CupWithUser[] }

    if (data.length === 0) {
      setIsFinished(true)
      return
    }

    setCups((prev) => [...prev, ...data])
  }

  useEffect(() => {
    if (inView && !isFinished) {
      getCups()
    }
  }, [inView])

  return (
    <>
      <ResponsiveMasonry className='px-1' columnsCountBreakPoints={{ 400: 2, 720: 3, 1100: 4, 1400: 5, 1700: 6 }}>
        <Masonry gutter='4px' className='pb-20'>
          {cups.map((cup, index) => (
            <div
              key={index}
              ref={index === cups.length - 3 && !isFinished ? ref : null}
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
                <p className='font-bold'>{cup.title}</p>
                <p className='text-xs text-primary/50 font-medium'>{cup.description}</p>

                <div className='flex items-center gap-1 my-2'>
                  <Image
                    src={cup.user.image!}
                    alt='cup author profile image'
                    width={24}
                    height={24}
                    className='bg-white rounded-full p-0.5'
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

      {!isFinished && (
        <div className='w-full flex items-center justify-center'>
          <Loader2 className='animate-spin w-12 h-12' />
        </div>
      )}
    </>
  )
}
