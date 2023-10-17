'use client'

import { cn } from '@/lib/utils'
import type { Cup, User } from '@prisma/client'
import { ArrowRight, MessageSquare, YoutubeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { BlurredImage } from './blurred-image'
import { ClipboardButton } from './clipboard-button'
import { buttonVariants } from './ui/button'

type Props = {
  initialCups: (Cup & {
    _count: {
      items: number
      comments: number
      likes: number
    }
    user: User
  })[]
}

export default function Cups({ initialCups }: Props) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 400: 2, 720: 3, 1100: 4, 1400: 5, 1700: 6 }}>
      <Masonry gutter='4px'>
        {initialCups.map((cup, index) => (
          <div
            ref={index === initialCups.length - 1 ? null : null}
            key={cup.id}
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
              <p>{cup.title}</p>
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
                {/* <LikeButton cup={cup} session={session} className='flex items-center gap-1 flex-1' /> */}
              </div>
            </div>
          </div>
        ))}

        {/* {isFetchingNextPage && (
          <div className='bg-primary/10 h-40 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-4 2xl:col-span-5' />
        )} */}
      </Masonry>
    </ResponsiveMasonry>
  )
}
