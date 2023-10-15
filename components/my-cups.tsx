'use client'

import { Cup } from '@prisma/client'
import dayjs from 'dayjs'
import { MessageSquare, Pencil, Trash2, Youtube } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { ClipboardWithLink } from './clipboard-with-link'
import { Button } from './ui/button'

type Props = {
  cups: (Cup & {
    _count: {
      items: number
      comments: number
    }
  })[]
}

export default function MyCups({ cups }: Props) {
  return (
    <div className='max-w-3xl mx-auto h-full flex flex-col gap-4'>
      {cups.map((cup, i) => (
        <div key={cup.id} className='flex p-2 flex-col sm:flex-row relative'>
          <span className='absolute -top-2 -left-1 font-bold px-2 shadow rounded bg-foreground text-background'>
            #{i + 1}
          </span>

          <div className='flex gap-3'>
            <CldImage
              src={cup.thumbnail}
              width={400}
              height={400}
              alt={cup.title}
              className='rounded object-cover w-40 h-40'
              quality={20}
            />
            <div className='flex flex-col'>
              <div className='flex flex-col justify-between h-full'>
                <div className='flex flex-col gap-1'>
                  <span>{cup.title}</span>
                  <span className='text-xs text-slate-500'>{cup.description}</span>
                </div>

                <div className='flex flex-col text-xs gap-1'>
                  {cup.type === 'IMAGE' ? (
                    <span className='bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-xs text-[10px] px-2 py-1 rounded text-white font-bold w-fit mb-1'>
                      이미지
                    </span>
                  ) : (
                    <div className='bg-[#f00] text-xs text-[10px] px-2 py-1 rounded text-white font-bold flex gap-1 w-fit mb-1'>
                      <Youtube className='w-4 h-4' /> 유튜브
                    </div>
                  )}

                  <div className='flex gap-4 mb-2'>
                    <span>{cup.playCount}회 플레이</span>
                    <span className='flex items-center'>
                      <MessageSquare className='w-3 h-3 mr-1' />
                      댓글 {cup._count.comments}개
                    </span>
                    <span>
                      {cup.type === 'IMAGE' ? '이미지' : '유튜브 영상'} {cup._count.items}개
                    </span>
                  </div>
                  <span className='text-[11px]'>
                    마지막 수정: {dayjs(cup.updatedAt).format('YYYY. MM월 DD일 - hh시 mm분')}
                  </span>
                  <span className='text-[11px]'>
                    최초 업로드: {dayjs(cup.createdAt).format('YYYY. MM월 DD일 - hh시 mm분')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='sm:ml-auto flex flex-col justify-between mt-8 sm:mt-0'>
            <div className='flex gap-1 justify-end'>
              <Button size='sm' className='text-xs h-8 rounded'>
                수정 <Pencil className='w-3 h-3 ml-1' />
              </Button>
              <Button size='sm' variant='destructive' className='text-xs h-8 rounded'>
                삭제 <Trash2 className='w-3 h-3 ml-1' />
              </Button>
            </div>
            <ClipboardWithLink
              path={`/cup/${cup.id}`}
              title='월드컵 공유하기'
              className='lg:flex lg:items-center lg:gap-2 lg:w-full lg:justify-end'
            />
          </div>
        </div>
      ))}
    </div>
  )
}
