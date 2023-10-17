import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url)
    const lastCupId = url.searchParams.get('lastCupId')
    const isLiked = url.searchParams.get('isLiked') === 'true' || false

    if (!lastCupId) return new NextResponse('/api/cup : "lastCupId" search params가 없습니다', { status: 400 })

    let cups

    if (isLiked) {
      const session = await getSession()

      if (!session) return new NextResponse('/api/cup : 인증된 유저가 아닙니다', { status: 401 })

      cups = await db.cup.findMany({
        take: 2,
        skip: 1,
        cursor: {
          id: lastCupId,
        },

        where: {
          likes: {
            some: {
              userId: session.user.id,
            },
          },
        },

        orderBy: {
          createdAt: 'desc',
        },
        include: {
          _count: true,
          user: true,
          likes: true,
        },
      })
    } else {
      cups = await db.cup.findMany({
        take: 2,
        skip: 1,
        cursor: {
          id: lastCupId,
        },

        orderBy: {
          createdAt: 'desc',
        },
        include: {
          _count: true,
          user: true,
          likes: true,
        },
      })
    }

    return NextResponse.json(cups)
  } catch (error) {
    return new NextResponse('/api/cup : server error', { status: 500 })
  }
}
