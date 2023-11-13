import { TypeCupSearchParams } from '@/types/type'
import type { Prisma } from '@prisma/client'

export const TAKE = 16

export function getQuery({ page, type, search }: { page: number; type?: TypeCupSearchParams; search?: string }) {
  const query: Prisma.CupFindManyArgs = {
    take: TAKE,
    skip: page * TAKE,

    where: {
      AND: [
        {
          ...(search !== 'undefined'
            ? {
                OR: [{ title: { contains: search } }, { description: { contains: search } }],
              }
            : {}),
        },
        {
          ...(type === 'image' ? { type: 'IMAGE' } : {}),
          ...(type === 'video' ? { type: 'VIDEO' } : {}),
        },
      ],
    },

    include: {
      _count: true,
      user: true,
      likes: true,
    },
  }

  return query
}
