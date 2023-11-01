import { ReactNode } from 'react'
import type { Prisma, Cup, CupType, Like, User } from '@prisma/client'

// for my convenience types 🍉

export type Children = {
  children: ReactNode
}

export type CupLength = 8 | 16 | 32 | 64

// types related with Prisma ⚙️

export type TypeCupSearchParams = 'all' | 'video' | 'image'

export type CupSearchParmas = {
  type: string
  search: string
}

export type cupData = {
  type: CupType
  title: string
  description: string
}

export type CupCount = {
  items: number
  comments: number
  likes: number
}

export type CupWithUser = Cup & {
  _count: CupCount
  user: User
  likes: Like[]
}

export type CupRankingPage = Prisma.CupGetPayload<{
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
    user: true
  }
}>
