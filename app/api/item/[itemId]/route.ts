import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { itemDescriptionSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'

export const PATCH = async (req: NextRequest, { params: { itemId } }: { params: { itemId: string } }) => {
  try {
    const session = await getSession()

    if (!session) {
      return new NextResponse('/api/item/[itemId] : 인증된 유저가 이닙니다', { status: 401 })
    }

    const body = await req.json()
    const { description } = itemDescriptionSchema.parse(body)

    const updatedItem = await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        description,
      },
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    return new NextResponse('/api/item/[itemId] : 아이템 삭제 실패', { status: 500 })
  }
}

export const DELETE = async (req: NextRequest, { params: { itemId } }: { params: { itemId: string } }) => {
  try {
    const session = await getSession()

    if (!session) {
      return new NextResponse('/api/item/[itemId] : 인증된 유저가 이닙니다', { status: 401 })
    }

    const deletedItem = await db.item.delete({
      where: {
        id: itemId,
      },
    })

    return NextResponse.json(deletedItem)
  } catch (error) {
    return new NextResponse('/api/item/[itemId] : 아이템 삭제 실패', { status: 500 })
  }
}
