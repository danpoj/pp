import { TypeCupSearchParams } from '@/types/type'
import type { Prisma } from '@prisma/client'

const TAKE = 16

export function getQuery({ page, type, search }: { page: number; type?: TypeCupSearchParams; search?: string }) {
  const query: Prisma.CupFindManyArgs = {
    take: TAKE,
    skip: page * TAKE,

    where: {
      ...(type === 'image' ? { type: 'IMAGE' } : {}),
      ...(type === 'video' ? { type: 'VIDEO' } : {}),
      // ...(type === 'all' && {}),

      ...(search
        ? {
            title: {
              contains: search,
            },
          }
        : {}),
    },

    orderBy: {
      likes: {
        _count: 'desc',
      },
    },

    include: {
      _count: true,
      user: true,
      likes: true,
    },
  }

  return query
}
