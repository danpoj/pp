'use client'

import { cn } from '@/lib/utils'
import type { Cup, Like } from '@prisma/client'
import axios from 'axios'
import type { Session } from 'next-auth'
import { useState } from 'react'
import HeartEmoji from '@/components/heart-emoji'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useModal } from '@/components/provider/modal-provider'
import { CupCount } from '@/types/type'

type Props = {
  cup: Cup & {
    _count: CupCount
    likes: Like[]
  }
  session: Session | null
  className?: string
  size?: 'sm' | 'lg'
}

export default function LikeButton({ cup, session, className, size }: Props) {
  const [like, setLike] = useState(cup.likes?.find((like) => like.userId === session?.user.id))
  const [likeCount, setLikeCount] = useState(cup._count.likes)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { open } = useModal()

  const isLiked = !!like

  const onClick = async () => {
    if (!session) {
      open('signin')
      return
    }

    try {
      setIsSubmitting(true)

      if (isLiked) {
        setLikeCount((prev) => prev - 1)
      } else {
        setLikeCount((prev) => prev + 1)
      }

      const { data } = await axios.patch(`/api/cup/${cup.id}/like`, { isLiked, like })

      setLike(data.like)

      router.refresh()
    } catch (error) {
      console.log(error)

      if (isLiked) {
        setLikeCount((prev) => prev + 1)
      } else {
        setLikeCount((prev) => prev - 1)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button onClick={onClick} disabled={isSubmitting} variant='ghost' className={className} size='sm'>
      <HeartEmoji size={size} className={cn(isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-slate-400')} />
      <span className='text-slate-500 text-xs'>{likeCount}</span>
    </Button>
  )
}
