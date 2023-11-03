import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getSession()

    if (!session) return new NextResponse('/api/user/image/default : 인증된 유저가 아닙니다', { status: 401 })

    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: `https://avatar.vercel.sh/${session.user.id}.svg?text=${session.user.nickname?.slice(0, 2)}`,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      new NextResponse('/api/user/image/default : body 데이터 형식이 맞지 않습니다', { status: 400 })
    }

    return new NextResponse('/api/user/image/default : 서버 오류', { status: 500 })
  }
}
