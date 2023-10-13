'use client'

import type { Cup, Like } from '@prisma/client'
import HeartEmoji from './heart-emoji'
import { Button } from './ui/button'
import { useState } from 'react'
import axios from 'axios'
import type { Session } from 'next-auth'
import { cn } from '@/lib/utils'

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
}

export default function LikeButton({ cup, session }: Props) {
  const [likedCount, setLikedCount] = useState(cup._count.likes)

  const isLiked = cup.likes.findIndex(({ id }) => id === session?.user.id) !== -1

  const onClick = async () => {
    try {
      const { data } = await axios.patch(`/api/cup/${cup.id}/like`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button onClick={onClick} variant='ghost' className='flex items-center gap-1 flex-1' size='sm'>
      <HeartEmoji className={cn(isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-slate-400')} />
      <span className='text-[11px] text-slate-500'>{cup._count.likes}</span>
    </Button>
  )
}
