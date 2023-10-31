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

    if (!session) return new NextResponse('/api/cup/[cupId]/item/image : 인증된 유저가 아닙니다', { status: 401 })

    const { images } = (await req.json()) as {
      images: {
        fileName: string
        width: string
        height: string
      }[]
    }

    const dbItems = await db.item.createMany({
      data: images.map((image) => ({
        cupId,
        url: `${process.env.NEXT_PUBLIC_S3_BASEURL}/${image.fileName}`,
        width: +image.width,
        height: +image.height,
        publicId: image.fileName,
      })),
    })

    return NextResponse.json('ok')
  } catch (error) {
    return new NextResponse('/api/cup/[cupId]/item/image : 유튜브 월드컵 컨텐츠 업로드 실패', { status: 500 })
  }
}
