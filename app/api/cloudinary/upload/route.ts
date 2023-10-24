import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export const maxDuration = 10

export const POST = async (req: NextRequest) => {
  try {
    const { image } = await req.json()

    const cldImage = await cloudinary.uploader.upload(image, {
      folder: 'cup',
      eager: [
        {
          width: 300,
          // height: 260,
          // quality: 40,
        },
        {
          width: 600,
          // height: 520,
          // quality: 40,
        },
      ],
    })

    return NextResponse.json(cldImage)
  } catch (error) {
    console.log(error)
    return new NextResponse('cloudinary image upload error', { status: 500 })
  }
}
