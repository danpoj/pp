'use client'

import { ClipboardWithLink } from '@/components/clipboard-with-link'
import CupCommentDeleteButton from '@/components/cup-comment-delete-button'
import CupCommentForm from '@/components/cup-comment-form'
import { useConfetti } from '@/components/provider/confetti-provider'
import { cn } from '@/lib/utils'
import type { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'

import { CupRankingPage } from '@/types/type'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from './ui/button'
import GoogleAdsense from './adsense/google-adsense'
import { Item } from '@prisma/client'
dayjs.extend(relativeTime)
dayjs.locale('ko')

export type ExtendedCup = CupRankingPage & {
  session: Session | null
}

export default function CupRanking({ session, ...cup }: ExtendedCup) {
  const { open: openConfetti } = useConfetti()
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    openConfetti()
  }, [])

  return (
    <div className='flex flex-col'>
      <m.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='flex flex-col gap-1 sm:flex-row sm:h-[32rem]'
      >
        {cup.items.slice(0, 3).map((item, index) => (
          <Link
            href={`/cup/${cup.id}/${item.id}`}
            key={item.id}
            className='rounded overflow-hidden relative h-[24rem] sm:h-full sm:w-1/3 flex items-center justify-center hover:opacity-90 transition-opacity'
          >
            <Image
              unoptimized
              src={item.publicId ? item.url : item.videoThumbnail!}
              alt='cup image'
              width={item.width!}
              height={item.height!}
              className='object-contain w-full h-full'
            />

            <div
              className={cn(
                'tracking-tight flex gap-2 items-center absolute right-2 top-2 px-3 py-1 rounded pointer-events-none text-white backdrop-blur-sm',
                index === 0 && 'bg-gradient-to-r from-rose-500/70 via-red-500/70 to-amber-500/70',
                index === 1 && 'bg-gradient-to-r from-cyan-500/70 via-sky-500/70 to-blue-500/70',
                index === 2 && 'bg-gradient-to-r from-green-500/70 via-emerald-500/70 to-lime-500/70'
              )}
            >
              <span className='font-black text-xl'>#{index + 1}</span>
              <span className='font-bold'>
                {cup.playCount === 0 ? '0.0' : ((item.winCount / cup.playCount) * 100).toFixed(1)}%
              </span>
            </div>
          </Link>
        ))}
      </m.div>

      <Button
        disabled={isDisabled}
        onClick={() => setIsOpen((prev) => !prev)}
        size='lg'
        className='mt-20 mb-10 max-w-[18rem]'
      >
        모든 결과 보기 ({cup._count.items - 3}개)
        <ChevronDown className={cn('ml-1 transition duration-300', isOpen ? 'rotate-180' : 'rotate-0')} />
      </Button>

      <span className='mb-10 text-lg font-bold bg-fancy w-fit text-transparent bg-clip-text'>
        🥹 아래 광고를 한 번 클릭하면 모든 결과를 볼 수 있습니다. 🥹
      </span>

      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 100,
            transition: {
              duration: 0.5,
            },
          }}
          className='mt-1 gap-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        >
          {cup.items.slice(3).map((item, index) => (
            <ResultItem key={item.id} item={item} index={index} cupPlayCount={cup.playCount} cupId={cup.id} />
          ))}
        </m.div>
      )}

      {isOpen && (
        <Button onClick={() => setIsOpen((prev) => !prev)} size='lg' className='my-20 max-w-[18rem]'>
          모든 결과 접기 <ChevronUp />
        </Button>
      )}

      <button onClick={() => setIsDisabled(false)}>
        <GoogleAdsense className='border aspect-video max-w-[36rem]' />
      </button>

      <div className='md:flex mt-2'>
        <div className='w-full flex flex-col h-full'>
          <div className='my-4 h-full pr-2'>
            <h2 className='text-xl sm:text-2xl font-extrabold text-primary/80 tracking-tight'>{cup.title}</h2>
            <h3 className='text-xs sm:text-sm font-semiboid text-primary/70 my-2'>{cup.description}</h3>
            <div className='flex items-center gap-1 my-2'>
              <Image
                unoptimized
                src={cup.user.image!}
                alt='cup author profile image'
                width={40}
                height={40}
                className='bg-white rounded-full p-0.5 w-[40px] h-[40px] object-cover'
              />
              <span className='font-normal'>@{cup.user.nickname}</span>
            </div>
            <div className='flex gap-4 font-bold  mt-10 mb-4 items-center'>
              <span className='bg-fancy bg-clip-text text-transparent'>월드컵 플레이 수: {cup.playCount}회</span>
            </div>

            <ClipboardWithLink path={`/cup/${cup.id}`} title='월드컵 공유하기' className='flex items-center gap-2' />
          </div>

          <div className='w-full mt-10'>
            <span className='text-lg ml-1'>댓글 {cup.comments.length}개</span>
            <CupCommentForm session={session} cupId={cup.id} />

            <div className='flex flex-col mt-6 gap-4 w-full pr-6 mb-20'>
              {cup.comments.length === 0 && <p className='text-xs tracking-tight'>등록된 댓글이 없습니다</p>}

              {cup.comments.map((comment) => (
                <div key={comment.id} className='flex flex-col gap-2 break-words'>
                  <div className='flex gap-1 items-center'>
                    <Image
                      unoptimized
                      src={comment.user.image!}
                      alt='user profile image'
                      width={40}
                      height={40}
                      className='w-6 h-6 rounded-full bg-white'
                    />
                    <span className='font-bold text-xs bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 w-fit bg-clip-text text-transparent'>
                      @{comment.user.nickname}
                    </span>
                    <span className='text-xs text-primary/60 tracking-tighter'>
                      {dayjs(comment.createdAt).fromNow()}
                    </span>

                    {session?.user.id === comment.userId && (
                      <CupCommentDeleteButton cupId={comment.cupId} commentId={comment.id} />
                    )}
                  </div>
                  <span className='text-xs w-full'>{comment.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultItem({
  item,
  index,
  cupPlayCount,
  cupId,
}: {
  item: Item
  index: number
  cupPlayCount: number
  cupId: string
}) {
  return (
    <Link
      href={`/cup/${cupId}/${item.id}`}
      key={item.id}
      className='rounded overflow-hidden relative shrink-0 h-full aspect-square flex items-center justify-center hover:opacity-90 transition-opacity'
    >
      <Image
        unoptimized
        src={item.publicId ? item.url : item.videoThumbnail!}
        alt='cup image'
        width={item.width!}
        height={item.height!}
        className='object-contain w-full h-full'
      />

      <div
        className={cn(
          'flex gap-2 items-center absolute right-2 top-2 px-2 py-1 rounded pointer-events-none text-white bg-black/70'
        )}
      >
        <span className='font-black text-xs sm:text-sm'>#{index + 4}</span>
        <span className='font-bold text-xs sm:text-sm'>
          {cupPlayCount === 0 ? '0.0' : ((item.winCount / cupPlayCount) * 100).toFixed(1)}%
        </span>
      </div>
    </Link>
  )
}
