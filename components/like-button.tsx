'use client'

import { cn } from '@/lib/utils'
import type { Cup, Like } from '@prisma/client'
import axios from 'axios'
import type { Session } from 'next-auth'
import { useState } from 'react'
import HeartEmoji from './heart-emoji'
import { Button } from './ui/button'

type Props = {
  cup: Cup & {
    _count: {
      items: number
      comments: number
      likes: number
    }
    likes: Like[]
  }
  session: Session | null
  className?: string
  size?: 'sm' | 'lg'
}

export default function LikeButton({ cup, session, className, size }: Props) {
  const [like, setLike] = useState(cup.likes.find((like) => like.userId === session?.user.id))
  const [likeCount, setLikeCount] = useState(cup._count.likes)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isLiked = !!like

  const onClick = async () => {
    try {
      setIsSubmitting(true)

      const { data } = await axios.patch(`/api/cup/${cup.id}/like`, { isLiked, like })

      if (isLiked) setLikeCount((prev) => prev - 1)
      else setLikeCount((prev) => prev + 1)

      setLike(data.like)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button onClick={onClick} disabled={isSubmitting} variant='ghost' className={className} size='sm'>
      <HeartEmoji size={size} className={cn(isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-slate-400')} />
      <span className='text-slate-500'>{likeCount}</span>
    </Button>
  )
}
