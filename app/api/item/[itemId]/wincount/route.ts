import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

type PatchProps = {
  params: {
    itemId: string
  }
}

export const PATCH = async (req: NextRequest, { params: { itemId } }: PatchProps) => {
  try {
    await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        winCount: {
          increment: 1,
        },
      },
    })

    return NextResponse.json('ok')
  } catch (error) {
    return new NextResponse('/api/item/[itemId]/wincount : item wincount increasing failed.', { status: 500 })
  }
}
