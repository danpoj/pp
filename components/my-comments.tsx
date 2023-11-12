'use client'

import { Cup, CupComment, Item, ItemComment, User } from '@prisma/client'
import axios from 'axios'
import { ArrowRight, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
dayjs.extend(relativeTime)
dayjs.locale('ko')

type Props = {
  user: User & {
    cupComments: (CupComment & {
      cup: Cup
    })[]
    itemComments: (ItemComment & {
      item: Item
    })[]
  }
}

export default function MyComments({ user }: Props) {
  const router = useRouter()
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null)

  const onDeleteCupComment = async ({ cupId, commentId }: { cupId: string; commentId: string }) => {
    try {
      setIsDeletingId(commentId)

      await axios.delete(`/api/cup/${cupId}/comment/${commentId}`)

      router.refresh()

      toast.success('댓글 삭제 완료')
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeletingId(null)
    }
  }

  const onDeleteItemComment = async ({ itemId, commentId }: { itemId: string; commentId: string }) => {
    try {
      setIsDeletingId(commentId)

      await axios.delete(`/api/item/${itemId}/comment/${commentId}`)

      router.refresh()

      toast.success('댓글 삭제 완료')
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div className='h-full flex flex-col mt-10 gap-2 pb-20'>
      <span className='text-base'>월드컵 랭킹 댓글 ({user.cupComments.length}개)</span>
      <Separator className='my-2' />
      {user.cupComments.map((comment, index) => (
        <div key={comment.id} className={cn('space-y-1 p-2 rounded', index % 2 === 1 && 'bg-primary/5')}>
          <div className='flex gap-1'>
            <div className='flex flex-col text-xs'>
              <span className='font-semibold max-w-[240px] truncate sm:max-w-[460px]'>{comment.cup.title}</span>
              <span className='text-slate-600 truncate max-w-[240px] sm:max-w-[460px]'>{comment.cup.description}</span>
            </div>
          </div>

          <div className='flex flex-col gap-2 break-words mb-4'>
            <div className='flex gap-1 items-center'>
              <Image
                unoptimized
                src={user.image!}
                alt='user profile image'
                width={40}
                height={40}
                className='w-6 h-6 rounded-full'
              />
              <span className='font-bold text-xs bg-fancy w-fit bg-clip-text text-transparent'>@{user.nickname}</span>
              <span className='text-xs text-primary/60 tracking-tighter'>{dayjs(comment.createdAt).fromNow()}</span>
            </div>
            <span className='text-xs w-full'>{comment.text}</span>
          </div>

          <div className='space-x-1 flex justify-end items-center pb-1'>
            <Button
              onClick={() => router.push(`/cup/${comment.cup.id}/ranking`)}
              variant='ghost'
              size='sm'
              className='rounded text-xs h-8'
            >
              게시글 이동 <ArrowRight className='w-3 h-3 ml-1' />
            </Button>
            <Button
              onClick={() =>
                onDeleteCupComment({
                  cupId: comment.cup.id,
                  commentId: comment.id,
                })
              }
              disabled={isDeletingId === comment.id}
              isLoading={isDeletingId === comment.id}
              variant='destructive'
              size='sm'
              className='rounded text-xs h-7'
            >
              삭제 <Trash2 className='w-3 h-3 ml-1' />
            </Button>
          </div>
        </div>
      ))}

      <span className='text-base mt-20'>컨텐츠 결과 댓글 ({user.itemComments.length}개)</span>
      <Separator className='my-2' />
      {user.itemComments.map((comment, index) => (
        <div key={comment.id} className={cn('space-y-1 p-2 rounded', index % 2 === 1 && 'bg-primary/5')}>
          <div className='flex gap-1'>
            <div className='flex flex-col text-xs'>
              <span className='font-semibold max-w-[240px] truncate sm:max-w-[460px]'>{comment.item.description}</span>
            </div>
          </div>

          <div className='flex flex-col gap-2 break-words mb-4'>
            <div className='flex gap-1 items-center'>
              <Image
                unoptimized
                src={user.image!}
                alt='user profile image'
                width={40}
                height={40}
                className='w-6 h-6 rounded-full'
              />
              <span className='font-bold text-xs bg-fancy w-fit bg-clip-text text-transparent'>@{user.nickname}</span>
              <span className='text-xs text-primary/60 tracking-tighter'>{dayjs(comment.createdAt).fromNow()}</span>
            </div>
            <span className='text-xs w-full'>{comment.text}</span>
          </div>

          <div className='space-x-1 flex justify-end pb-1'>
            <Button
              onClick={() => router.push(`/cup/${comment.item.id}/${comment.itemId}`)}
              variant='ghost'
              size='sm'
              className='rounded text-xs h-8'
            >
              게시글 이동 <ArrowRight className='w-3 h-3 ml-1' />
            </Button>
            <Button
              onClick={() =>
                onDeleteItemComment({
                  itemId: comment.item.id,
                  commentId: comment.id,
                })
              }
              disabled={isDeletingId === comment.id}
              isLoading={isDeletingId === comment.id}
              variant='destructive'
              size='sm'
              className='rounded text-xs h-8'
            >
              삭제 <Trash2 className='w-3 h-3 ml-1' />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
