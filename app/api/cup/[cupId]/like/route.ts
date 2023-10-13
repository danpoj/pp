import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const PATCH = async (req: NextRequest, { params: { cupId } }: { params: { cupId: string } }) => {
  try {
    const session = await getSession()

    if (!session) return new NextResponse('/api/cup/[cupId]/like : 인증되지 않은 유저입니다', { status: 401 })

    const { like, count } = await req.json()

    if (like) {
      await db.like.delete({
        where: {
          id: like.id,
        },
      })

      return NextResponse.json({
        count: count - 1,
      })
    }

    const dbLike = await db.like.create({
      data: {
        cupId: cupId,
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      like: dbLike,
      count: count + 1,
    })
  } catch (error) {
    return new NextResponse('/api/cup/[cupId]/like : server error ', { status: 500 })
  }
}
