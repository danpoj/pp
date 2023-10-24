import type { Prisma } from '@prisma/client'

type Type = 'all' | 'video' | 'image'

const TAKE = 12

export function getQuery({ page, type }: { page: number; type?: Type }) {
  const query: Prisma.CupFindManyArgs = {
    take: TAKE,
    skip: page * TAKE,

    where: {
      ...(type === 'image' ? { type: 'IMAGE' } : {}),
      ...(type === 'video' ? { type: 'VIDEO' } : {}),
      ...(type === 'all' && {}),
    },

    orderBy: {
      createdAt: 'desc',
    },

    include: {
      _count: true,
      user: true,
      likes: true,
    },
  }

  return query
}
