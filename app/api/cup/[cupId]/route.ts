import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

type DeleteProps = {
  params: {
    cupId: string
  }
}

export const DELETE = async (req: NextRequest, { params: { cupId } }: DeleteProps) => {
  try {
    const session = await getSession()

    if (!session) return new NextResponse('/api/cup/[cupId] : 인증된 유저가 아닙니다', { status: 401 })

    const cup = await db.cup.findUnique({
      where: {
        id: cupId,
        userId: session.user.id,
      },
      include: {
        items: {
          select: {
            publicId: true,
          },
        },
      },
    })

    if (!cup) return new NextResponse('/api/cup/[cupId] : 인증된 유저가 아닙니다', { status: 401 })

    if (cup.type === 'IMAGE') {
      const promises = cup.items.map((item) => cloudinary.uploader.destroy(`${item.publicId}`))

      await Promise.all(promises)

      await cloudinary.api.delete_folder(`cup/${cup.folder}`)
    }

    const deletedCup = await db.cup.delete({
      where: {
        id: cupId,
        userId: session.user.id,
      },
    })

    return NextResponse.json(deletedCup)
  } catch (error) {
    return new NextResponse('/api/cup/[cupId] : 월드컵 삭제 실패', { status: 500 })
  }
}
