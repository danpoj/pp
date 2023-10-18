import { Prisma } from '@prisma/client'

type Type = 'all' | 'video' | 'image'
type Order = 'popular' | 'like' | 'newest'

export function getQuery({ lastCupId, type, order }: { lastCupId?: string; type?: Type; order?: Order }) {
  const query: Prisma.CupFindManyArgs = {
    take: lastCupId ? 12 : 24,
    skip: lastCupId ? 1 : 0,
    ...(lastCupId
      ? {
          cursor: {
            id: lastCupId,
          },
        }
      : {}),

    ...(type === 'image'
      ? {
          where: {
            type: {
              equals: 'IMAGE',
            },
          },
        }
      : {}),

    ...(type === 'video'
      ? {
          where: {
            type: {
              equals: 'VIDEO',
            },
          },
        }
      : {}),

    orderBy: {
      ...(order === 'popular'
        ? {
            playCount: 'desc',
          }
        : order === 'like'
        ? {
            likes: {
              _count: 'desc',
            },
          }
        : {
            createdAt: 'desc',
          }),
    },
    include: {
      _count: true,
      user: true,
      likes: true,
    },
  }

  return query
}
