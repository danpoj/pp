'use client'

import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ClipboardWithLink } from './clipboard-with-link'
import type { Prisma } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import CupCommentForm from './cup-comment-form'
import type { Session } from 'next-auth'

export type ExtendedCup = Prisma.CupGetPayload<{
  include: {
    _count: true
    comments: {
      orderBy: {
        createdAt: 'desc'
      }
      include: {
        user: true
      }
    }
    items: {
      orderBy: {
        winCount: 'asc'
      }
    }
  }
}> & {
  session: Session | null
}

export default function CupRanking({ session, ...cup }: ExtendedCup) {
  const router = useRouter()

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-1 sm:flex-row sm:h-[20rem]'>
        {cup.items.slice(0, 3).map((item, index) => (
          <Link
            href={`/cup/${cup.id}/${item.id}`}
            key={item.id}
            className='rounded overflow-hidden relative h-[24rem] sm:h-full sm:w-1/3'
          >
            {cup.type === 'IMAGE' && (
              <CldImage src={item.publicId!} alt='cup image' fill className='object-contain' quality={20} />
            )}
            {cup.type === 'VIDEO' && (
              <Image src={item.videoThumbnail!} alt='cup image' fill className='object-contain' quality={20} />
            )}
            <div
              className={cn(
                'tracking-tighter flex gap-2 items-center absolute right-2 top-2 px-3 py-1 rounded pointer-events-none text-white backdrop-blur-sm',
                index === 0 && 'bg-gradient-to-r from-rose-500/70 via-red-500/70 to-amber-500/70',
                index === 1 && 'bg-gradient-to-r from-cyan-500/70 via-sky-500/70 to-blue-500/70',
                index === 2 && 'bg-gradient-to-r from-green-500/70 via-emerald-500/70 to-lime-500/70'
              )}
            >
              <span className='font-black text-2xl'>#{index + 1}</span>
              <span className='font-bold'>
                {cup.playCount === 0 ? '0.0' : ((item.winCount / cup.playCount) * 100).toFixed(1)}%
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className='w-full overflow-scroll h-[20rem] flex mt-1 gap-1 pb-4'>
        {cup.items.slice(3).map((item, index) => (
          <Link
            href={`/cup/${cup.id}/${item.id}`}
            key={item.id}
            className='rounded overflow-hidden relative shrink-0 h-full aspect-square'
          >
            {cup.type === 'IMAGE' && (
              <CldImage src={item.publicId!} alt='cup image' fill className='object-contain' quality={20} />
            )}
            {cup.type === 'VIDEO' && (
              <Image src={item.videoThumbnail!} alt='cup image' fill className='object-contain' quality={20} />
            )}
            <div
              className={cn(
                'tracking-tighter flex gap-2 items-center absolute right-2 top-2 px-3 py-1 rounded pointer-events-none text-white bg-black'
              )}
            >
              <span className='font-black text-xl'>#{index + 4}</span>
              <span className='font-bold'>
                {cup.playCount === 0 ? '0.0' : ((item.winCount / cup.playCount) * 100).toFixed(1)}%
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className='md:flex mt-2'>
        <div className='w-full flex flex-col h-full'>
          <div className='my-4 h-full pr-2'>
            <h1 className='text-2xl font-extrabold text-primary/80 tracking-tight'>{cup.title}</h1>
            <p className='text-sm font-semiboid text-primary/70 my-2'>{cup.description}</p>
            <div className='flex gap-4 font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent mt-10 mb-4'>
              <span>총 월드컵 진행 수: {cup.playCount}회</span>
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
                      src={comment.user.image!}
                      alt='user profile image'
                      width={40}
                      height={40}
                      className='w-6 h-6'
                    />
                    <span className='font-bold text-xs bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 w-fit bg-clip-text text-transparent'>
                      @{comment.user.nickname}
                    </span>
                    <span className='text-xs text-primary/40 tracking-tighter font-light'>
                      {dayjs(comment.createdAt).format('YYYY.M.D')}
                    </span>
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
