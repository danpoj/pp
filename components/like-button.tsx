'use client'

import type { Cup, Like } from '@prisma/client'
import HeartEmoji from './heart-emoji'
import { Button } from './ui/button'
import { useState } from 'react'
import axios from 'axios'
import type { Session } from 'next-auth'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

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
  const [likedCount, setLikedCount] = useState(cup._count.likes)
  const [like, setLike] = useState(cup.likes.find((like) => like.userId === session?.user.id))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onClick = async () => {
    try {
      setIsSubmitting(true)

      if (like) {
        setLikedCount((prev) => prev - 1)
      } else {
        setLikedCount((prev) => prev + 1)
      }

      const { data } = await axios.patch(`/api/cup/${cup.id}/like`, { like, count: likedCount })

      setLike(data.like)
      setLikedCount(data.count)
    } catch (error) {
      if (like) {
        setLikedCount((prev) => prev + 1)
      } else {
        setLikedCount((prev) => prev - 1)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button onClick={onClick} disabled={isSubmitting} variant='ghost' className={className} size='sm'>
      <HeartEmoji size={size} className={cn(!!like ? 'fill-red-500 stroke-red-500' : 'stroke-slate-400')} />
      <span className='text-slate-500'>{likedCount}</span>
    </Button>
  )
}
