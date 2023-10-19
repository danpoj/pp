import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { createImageSchema } from '@/lib/validations'
import { v2 as cloudinary } from 'cloudinary'
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const config = { api: { bodyParser: { sizeLimit: '1000mb' } } }

export const POST = async (req: NextRequest) => {
  try {
    const session = await getSession()

    if (!session) {
      return new NextResponse('/api/create/image : 인증된 유저가 이닙니다', { status: 401 })
    }

    const body = await req.json()

    const { images, type, title, description } = createImageSchema.parse(body)

    const folderName = nanoid(10)

    const promises = images.map((image) =>
      cloudinary.uploader.upload(image, {
        folder: `cup/${folderName}`,
        // transformation: [{ quality: 50 }],
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
        thumbnailWidth: cldImages[0].width,
        thumbnailHeight: cldImages[0].height,
        userId: session.user.id,
      },
    })

    if (!cup) {
      return new NextResponse('/api/create/image : cup 만들기 실패', { status: 500 })
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
