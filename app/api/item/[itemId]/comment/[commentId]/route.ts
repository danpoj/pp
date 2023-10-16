import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (req: NextRequest, { params }: { params: { itemId: string; commentId: string } }) => {
  try {
    const session = await getSession()

    if (!session)
      return new NextResponse('/api/item/[itemId]/comment/[commentId] : 인증된 유저가 아닙니다', { status: 401 })

    const deletedItemComment = await db.itemComment.delete({
      where: {
        id: params.commentId,
        userId: session.user.id,
      },
    })

    return NextResponse.json(deletedItemComment)
  } catch (error) {
    return new NextResponse('/api/item/[itemId]/comment/[commentId] : 아이템 댓글 삭제 실패', { status: 500 })
  }
}
