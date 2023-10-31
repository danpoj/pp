import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

type DeleteProps = {
  params: {
    cupId: string
  }
}

export const DELETE = async (req: NextRequest, { params: { cupId } }: DeleteProps) => {
  try {
    const session = await getSession()

    if (!session) return new NextResponse('/api/cup/[cupId] : 인증된 유저가 아닙니다', { status: 401 })

    const cup = await db.cup.findUnique({
      where: {
        id: cupId,
        userId: session.user.id,
      },
      include: {
        items: {
          select: {
            publicId: true,
          },
        },
      },
    })

    if (!cup) return new NextResponse('/api/cup/[cupId] : 인증된 유저가 아닙니다', { status: 401 })

    // TODO: 컵 이미지들 s3에서 삭제

    const deletedCup = await db.cup.delete({
      where: {
        id: cupId,
        userId: session.user.id,
      },
    })

    return NextResponse.json(deletedCup)
  } catch (error) {
    return new NextResponse('/api/cup/[cupId] : 월드컵 삭제 실패', { status: 500 })
  }
}
