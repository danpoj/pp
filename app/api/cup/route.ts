import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url)
    const lastCupId = url.searchParams.get('lastCupId')

    if (!lastCupId) return new NextResponse('/api/cup : "lastCupId" search params가 없습니다', { status: 400 })

    const cups = await db.cup.findMany({
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
      },
    })

    return NextResponse.json(cups)
  } catch (error) {
    return new NextResponse('/api/cup : server error', { status: 500 })
  }
}
