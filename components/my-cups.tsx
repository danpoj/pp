'use client'

import { Cup, CupType } from '@prisma/client'
import axios from 'axios'
import dayjs from 'dayjs'
import { MessageSquare, Pencil, Trash2, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ClipboardWithLink } from './clipboard-with-link'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'
import { CldImage } from 'next-cloudinary'

type Props = {
  cups: (Cup & {
    _count: {
      items: number
      comments: number
    }
  })[]
}

export default function MyCups({ cups }: Props) {
  const router = useRouter()
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null)

  const onDelete = async ({ cupId, type }: { cupId: string; type: CupType }) => {
    try {
      setIsDeletingId(cupId)

      await axios.delete(`/api/cup/${cupId}`)

      toast({
        title: '월드컵 삭제 완료',
        style: {
          backgroundColor: '#111',
          color: '#ddd',
        },
      })

      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div className=' h-full flex flex-col gap-4 mt-10 pb-20'>
      {cups.map((cup, i) => (
        <div key={cup.id} className='flex p-2 flex-col md:flex-row relative'>
          <div className='absolute top-4 left-2 font-bold px-2 rounded flex gap-1 items-center'>
            {cup.type === 'IMAGE' ? (
              <span className='bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-xs text-[10px] px-2 py-1 rounded text-white font-bold w-fit mb-1'>
                이미지
              </span>
            ) : (
              <div className='bg-[#f00] text-xs text-[10px] px-2 py-1 rounded text-white font-bold flex gap-1 w-fit mb-1'>
                <Youtube className='w-4 h-4' /> 유튜브
              </div>
            )}
          </div>

          <div className='flex gap-3'>
            <Link href={`/cup/${cup.id}`} className='shrink-0'>
              {cup.type === 'IMAGE' ? (
                <CldImage
                  src={cup.thumbnail}
                  width={cup.thumbnailWidth}
                  height={cup.thumbnailHeight}
                  alt={cup.title}
                  className='rounded object-cover w-52 h-52'
                  quality={40}
                />
              ) : (
                <Image
                  src={cup.thumbnail}
                  width={208}
                  height={208}
                  alt={cup.title}
                  className='rounded object-cover w-52 h-52'
                />
              )}
            </Link>
            <div className='flex flex-col'>
              <div className='flex flex-col justify-between h-full'>
                <div className='flex flex-col gap-1'>
                  <span>{cup.title}</span>
                  <span className='text-xs text-slate-500 max-h-16 overflow-y-scroll'>{cup.description}</span>
                </div>

                <div className='flex flex-col text-xs gap-0.5'>
                  <div className='flex gap-4 mb-2 font-semibold'>
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
                    마지막 수정: {dayjs(cup.updatedAt).format('YYYY. MM월 DD일 - hh:mm')}
                  </span>
                  <span className='text-[11px]'>
                    최초 업로드: {dayjs(cup.createdAt).format('YYYY. MM월 DD일 - hh:mm')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='md:ml-auto flex flex-col justify-between mt-8 md:mt-0 shrink-0'>
            <div className='flex gap-1 justify-end'>
              <Button onClick={() => router.push(`/cup/${cup.id}/update`)} size='sm' className='text-xs h-8 rounded'>
                수정 <Pencil className='w-3 h-3 ml-1' />
              </Button>
              <Button
                disabled={isDeletingId === cup.id}
                isLoading={isDeletingId === cup.id}
                onClick={() => onDelete({ cupId: cup.id, type: cup.type })}
                size='sm'
                variant='destructive'
                className='text-xs h-8 rounded'
              >
                삭제 <Trash2 className='w-3 h-3 ml-1' />
              </Button>
            </div>
            <ClipboardWithLink path={`/cup/${cup.id}`} title='월드컵 공유하기' className='' />
          </div>
        </div>
      ))}
    </div>
  )
}
