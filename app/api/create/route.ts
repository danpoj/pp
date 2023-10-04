import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { createSchema } from '@/lib/validations'
import { v2 as cloudinary } from 'cloudinary'
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const POST = async (req: NextRequest) => {
  try {
    const session = await getSession()

    if (!session) {
      return new NextResponse('/api/create : 인증된 유저가 이닙니다', { status: 401 })
    }

    const body = await req.json()

    console.log(body)

    const { images, type, title, description } = createSchema.parse(body)

    const folderName = nanoid(10)

    const promises = images.map((image) =>
      cloudinary.uploader.upload(image, {
        folder: `cup/${folderName}`,
      })
    )

    const cldImages = await Promise.all(promises)

    const cup = await db.cup.create({
      data: {
        type,
        title,
        description,
        folder: folderName,
        thumbnail: cldImages[0].secure_url,
        userId: session.user.id,
      },
    })

    if (!cup) {
      return new NextResponse('/api/create : cup 만들기 실패', { status: 500 })
    }

    const items = await db.item.createMany({
      data: cldImages.map((image) => ({
        cupId: cup.id,
        url: image.secure_url,
        width: image.width,
        height: image.height,
        publicId: image.public_id,
        folder: folderName,
      })),
    })

    if (!items) {
      return new NextResponse('/api/create : items 만들기 실패', { status: 500 })
    }

    return NextResponse.json({
      thumbnail: cup.thumbnail,
      title: cup.title,
      description: cup.description,
      cupId: cup.id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      new NextResponse('/api/create : request 데이터 형식이 맞지 않습니다', { status: 422 })
    }

    return new NextResponse('/api/create : 이미지 업로드 실패', { status: 500 })
  }
}
