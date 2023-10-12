import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { createVideoSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const POST = async (req: NextRequest) => {
  try {
    const session = await getSession()

    if (!session) {
      return new NextResponse('/api/create/image : 인증된 유저가 이닙니다', { status: 401 })
    }

    const body = await req.json()

    const { links, title, description } = createVideoSchema.parse(body)

    const cup = await db.cup.create({
      data: {
        type: 'VIDEO',
        title,
        description,
        thumbnail: links[0].imageUrl,
        thumbnailWidth: 1280,
        thumbnailHeight: 720,
        userId: session.user.id,
      },
    })

    if (!cup) {
      return new NextResponse('/api/create/image : cup 만들기 실패', { status: 500 })
    }

    const items = await db.item.createMany({
      data: links.map(({ videoUrl, imageUrl }) => ({
        cupId: cup.id,
        url: videoUrl,
        width: 1280,
        height: 720,
        videoThumbnail: imageUrl,
      })),
    })

    if (!items) {
      return new NextResponse('/api/create/image : items 만들기 실패', { status: 500 })
    }

    return NextResponse.json({
      thumbnail: cup.thumbnail,
      title: cup.title,
      description: cup.description,
      cupId: cup.id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      new NextResponse('/api/create/image : request 데이터 형식이 맞지 않습니다', { status: 400 })
    }

    return new NextResponse('/api/create/image : 이미지 업로드 실패', { status: 500 })
  }
}
