'use client'

import { Cup, CupComment, Item, ItemComment, User } from '@prisma/client'
import axios from 'axios'
import dayjs from 'dayjs'
import { ArrowRight, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

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
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div className='h-full flex flex-col mt-10 gap-2 pb-20'>
      <span className='text-lg font-bold'>월드컵 랭킹 댓글 ({user.cupComments.length}개)</span>

      {user.cupComments.map((comment) => (
        <div key={comment.id} className='space-y-1 p-2 rounded'>
          <div className='flex gap-1'>
            <Image
              src={comment.cup.thumbnail}
              alt={comment.cup.title}
              width={50}
              height={50}
              className='rounded w-[50px] h-[50px] object-cover'
            />
            <div className='flex flex-col text-xs'>
              <span className='font-semibold max-w-[240px] truncate sm:max-w-[460px]'>{comment.cup.title}</span>
              <span className='text-slate-600 truncate max-w-[240px] sm:max-w-[460px]'>{comment.cup.description}</span>
            </div>
          </div>

          <div className='flex flex-col gap-2 break-words mb-4'>
            <div className='flex gap-1 items-center'>
              <Image
                src={user.image!}
                alt='user profile image'
                width={40}
                height={40}
                className='w-6 h-6 rounded-full'
              />
              <span className='font-bold text-xs bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 w-fit bg-clip-text text-transparent'>
                @{user.nickname}
              </span>
              <span className='text-xs text-primary/40 tracking-tighter font-light'>
                {dayjs(comment.createdAt).format('YYYY.M.D')}
              </span>
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

          <Separator />
        </div>
      ))}

      <span className='text-lg font-bold mt-20'>컨텐츠 결과 댓글 ({user.itemComments.length}개)</span>
      <Separator className='my-2' />
      {user.itemComments.map((comment) => (
        <div key={comment.id} className='space-y-1 p-2 rounded'>
          <div className='flex gap-1'>
            <Image
              src={comment.item.videoThumbnail || comment.item.url}
              alt={comment.item.description || 'cup result image'}
              width={50}
              height={50}
              className='rounded w-[50px] h-[50px] object-cover'
            />
          </div>

          <div className='flex flex-col gap-2 break-words mb-4'>
            <div className='flex gap-1 items-center'>
              <Image src={user.image!} alt='user profile image' width={40} height={40} className='w-6 h-6' />
              <span className='font-bold text-xs bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 w-fit bg-clip-text text-transparent'>
                @{user.nickname}
              </span>
              <span className='text-xs text-primary/40 tracking-tighter font-light'>
                {dayjs(comment.createdAt).format('YYYY.M.D')}
              </span>
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

          <Separator className='' />
        </div>
      ))}
    </div>
  )
}
