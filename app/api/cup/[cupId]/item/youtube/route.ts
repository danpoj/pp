import { getSession } from '@/lib/auth'
import db from '@/lib/db'
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

    const { items } = await req.json()

    const responses = await db.item.createMany({
      data: items.map((item) => ({
        cupId,
        url: item.secure_url,
        width: item.width,
        height: item.height,
        publicId: item.public_id,
      })),
    })

    return NextResponse.json(updatedCup)
  } catch (error) {
    return new NextResponse('/api/cup/[cupId]/title : 월드컵 제목 업데이트 실패', { status: 500 })
  }
}
