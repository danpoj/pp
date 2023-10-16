import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { descriptionSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

type PatchProps = {
  params: {
    cupId: string
  }
}

export const PATCH = async (req: NextRequest, { params: { cupId } }: PatchProps) => {
  const session = await getSession()

  if (!session) return new NextResponse('/api/cup/[cupId]/description : 인증된 유저가 아닙니다', { status: 401 })

  const body = await req.json()
  const { description } = descriptionSchema.parse(body)

  try {
    const updatedCup = await db.cup.update({
      where: {
        id: cupId,
        userId: session.user.id,
      },
      data: {
        description,
      },
    })

    return NextResponse.json(updatedCup)
  } catch (error) {
    if (error instanceof z.ZodError) {
      new NextResponse('/api/create/image : request 데이터 형식이 맞지 않습니다', { status: 400 })
    }

    return new NextResponse('/api/cup/[cupId]/description : 월드컵 설명 업데이트 실패', { status: 500 })
  }
}
