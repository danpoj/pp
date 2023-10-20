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

    if (!session) return new NextResponse('/api/cup/[cupId]/item/youtube : 인증된 유저가 아닙니다', { status: 401 })

    const { links } = (await req.json()) as {
      links: {
        videoUrl: string
        imageUrl: string
      }[]
    }

    const dbItems = await db.item.createMany({
      data: links.map(({ videoUrl, imageUrl }) => ({
        cupId,
        url: videoUrl,
        width: 1280,
        height: 720,
        videoThumbnail: imageUrl,
      })),
    })

    return NextResponse.json(dbItems)
  } catch (error) {
    return new NextResponse('/api/cup/[cupId]/item/youtube : 유튜브 월드컵 컨텐츠 업로드 실패', { status: 500 })
  }
}
