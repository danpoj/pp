import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import type { Item } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type PatchProps = {
  params: {
    cupId: string
  }
}

export const POST = async (req: NextRequest, { params: { cupId } }: PatchProps) => {
  try {
    const session = await getSession()

    if (!session) return new NextResponse('/api/cup/[cupId]/title : 인증된 유저가 아닙니다', { status: 401 })

    const { images } = (await req.json()) as {
      images: {
        secure_url: string
        width: number
        height: number
        public_id: string
      }[]
    }

    const dbItems = await db.item.createMany({
      data: images.map((image) => ({
        cupId,
        url: image.secure_url,
        width: image.width,
        height: image.height,
        publicId: image.public_id,
      })),
    })

    return NextResponse.json(dbItems)
  } catch (error) {
    return new NextResponse('/api/cup/[cupId]/title : 월드컵 제목 업데이트 실패', { status: 500 })
  }
}
