'use client'

import { useModal } from '@/components/provider/modal-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CupCount } from '@/types/type'
import type { Cup, Like } from '@prisma/client'
import axios from 'axios'
import { Star } from 'lucide-react'
import type { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
    <Button
      onClick={onClick}
      disabled={isSubmitting}
      variant='ghost'
      className={cn(className, 'disabled:opacity-100')}
      size='sm'
    >
      <Star className={cn('w-3.5 h-3.5', isLiked ? 'fill-yellow-400 stroke-yellow-600' : 'stroke-slate-400')} />
      <span className='text-slate-500 text-xs'>{likeCount}</span>
    </Button>
  )
}
