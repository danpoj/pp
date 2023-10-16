import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { titleSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

type PatchProps = {
  params: {
    cupId: string
  }
}

export const PATCH = async (req: NextRequest, { params: { cupId } }: PatchProps) => {
  const session = await getSession()

  if (!session) return new NextResponse('/api/cup/[cupId]/title : 인증된 유저가 아닙니다', { status: 401 })

  const body = await req.json()
  const { title } = titleSchema.parse(body)

  try {
    const updatedCup = await db.cup.update({
      where: {
        id: cupId,
        userId: session.user.id,
      },
      data: {
        title,
      },
    })

    return NextResponse.json(updatedCup)
  } catch (error) {
    if (error instanceof z.ZodError) {
      new NextResponse('/api/cup/[cupId]/title : request 데이터 형식이 맞지 않습니다', { status: 400 })
    }

    return new NextResponse('/api/cup/[cupId]/title : 월드컵 제목 업데이트 실패', { status: 500 })
  }
}
