import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

type PostProps = {
  params: {
    itemId: string
  }
}

const commentSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, { message: '댓글을 입력해주세요' })
    .max(1000, { message: '1000글자 이하의 댓글을 입력해주세요' }),
})

export const POST = async (req: NextRequest, { params: { itemId } }: PostProps) => {
  try {
    const session = await getSession()

    if (!session) return new NextResponse('/api/item/[itemId]/comment : 인증된 유저가 아닙니다', { status: 401 })

    const body = await req.json()

    const { comment } = commentSchema.parse(body)

    const dbComment = await db.itemComment.create({
      data: {
        itemId: itemId,
        text: comment,
        userId: session.user.id,
      },
    })

    if (!dbComment) new NextResponse('/api/item/[itemId]/comment : 댓글 생성 실패', { status: 500 })

    return NextResponse.json(dbComment)
  } catch (error) {
    if (error instanceof z.ZodError) {
      new NextResponse('/api/item/[itemId]/comment : request 데이터 형식이 맞지 않습니다', { status: 400 })
    }

    return new NextResponse('/api/item/[itemId]/comment : 이미지 업로드 실패', { status: 500 })
  }
}
