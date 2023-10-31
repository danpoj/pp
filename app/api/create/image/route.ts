import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { createImageSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const POST = async (req: NextRequest) => {
  try {
    const session = await getSession()

    if (!session) {
      return new NextResponse('/api/create/image : 인증된 유저가 이닙니다', { status: 401 })
    }

    const body = await req.json()

    const { type, title, description, images } = createImageSchema.parse(body)

    const cup = await db.cup.create({
      data: {
        type,
        title,
        description,
        thumbnail: `${process.env.NEXT_PUBLIC_S3_BASEURL}/${images[0].fileName}`,
        thumbnailWidth: +images[0].width,
        thumbnailHeight: +images[0].height,
        userId: session.user.id,
      },
    })

    if (!cup) {
      return new NextResponse('/api/create/image : cup 만들기 실패', { status: 500 })
    }

    const items = await db.item.createMany({
      data: images.map((image) => ({
        cupId: cup.id,
        url: `${process.env.NEXT_PUBLIC_S3_BASEURL}/${image.fileName}`,
        width: +image.width,
        height: +image.height,
        publicId: image.fileName,
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
      thumbnailWidth: cup.thumbnailWidth,
      thumbnailHeight: cup.thumbnailHeight,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      new NextResponse('/api/create/image : request 데이터 형식이 맞지 않습니다', { status: 400 })
    }

    return new NextResponse('/api/create/image : 이미지 업로드 실패', { status: 500 })
  }
}
