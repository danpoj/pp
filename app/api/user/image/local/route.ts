import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v2 as cloudinary } from 'cloudinary'

const bodySchema = z.object({
  avatar: z.string().min(1),
})

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getSession()

    if (!session) return new NextResponse('/api/user/image/local : 인증된 유저가 아닙니다', { status: 401 })

    const body = await req.json()

    const { avatar } = bodySchema.parse(body)

    const cldImage = await cloudinary.uploader.upload(avatar, {
      folder: 'user',
    })

    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: cldImage.secure_url,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      new NextResponse('/api/user/image/local : body 데이터 형식이 맞지 않습니다', { status: 400 })
    }

    return new NextResponse('/api/user/image/local : 서버 오류', { status: 500 })
  }
}
