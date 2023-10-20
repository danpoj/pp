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
          quality: 50,
        },
      ],
    })

    return NextResponse.json(cldImage)
  } catch (error) {
    console.log(error)
    return new NextResponse('cloudinary image upload error', { status: 500 })
  }
}
