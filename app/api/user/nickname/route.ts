import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const nicknameSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, { message: '닉네임을 입력해주세요' })
    .max(20, '닉네임은 20글자를 넘길 수 없습니다'),
})

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getSession()

    if (!session) return new NextResponse('/api/user/nickname : 인증된 유저가 아닙니다', { status: 401 })

    const body = await req.json()

    const { nickname } = nicknameSchema.parse(body)

    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        nickname,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      new NextResponse('/api/user/nickname : body 데이터 형식이 맞지 않습니다', { status: 400 })
    }

    return new NextResponse('/api/user/nickname : 서버 오류', { status: 500 })
  }
}
