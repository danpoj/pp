import { CupWithUser } from '@/types/type'
import db from './db'

export const getCupRankingPage = (cupId: string) => {
  return db.cup.findUnique({
    where: {
      id: cupId,
    },
    include: {
      _count: true,
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      },
      items: {
        orderBy: {
          winCount: 'desc',
        },
      },
      user: true,
    },
  })
}

export const getItemResultPage = (itemId: string) => {
  return db.item.findUnique({
    where: {
      id: itemId,
    },
    include: {
      cup: true,
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      },
    },
  })
}

export const getCupUpdatePage = ({ userId, cupId }: { userId: string; cupId: string }) => {
  return db.cup.findUnique({
    where: {
      id: cupId,
      userId: userId,
    },
    include: {
      _count: true,
      items: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
}

export const getCupPage = (cupId: string) => {
  return db.cup.findUnique({
    where: {
      id: cupId,
    },
    include: {
      items: true,
    },
  })
}

export const getMyCupPage = (userId: string) => {
  return db.cup.findMany({
    where: {
      userId,
    },
    include: {
      _count: true,
    },

    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const getMyCommentPage = (userId: string) => {
  return db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      _count: true,
      cupComments: {
        include: {
          cup: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      itemComments: {
        include: {
          item: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
}

export const getMyLikesPage = (userId: string): Promise<CupWithUser[]> => {
  return db.cup.findMany({
    skip: 0,
    take: 16,
    where: {
      likes: {
        some: {
          userId,
        },
      },
    },
    include: {
      _count: true,
      user: true,
      likes: true,
    },
  })
}
