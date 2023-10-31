import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { uploadImageToS3 } from '@/lib/upload-image-to-s3'
import { NextRequest, NextResponse } from 'next/server'

// const bodySchema = z.object({
//   avatar: z.string().min(1),
// })

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) return new NextResponse('/api/user/image/local : 인증된 유저가 아닙니다', { status: 401 })

    const formData = await request.formData()

    const file = formData.get('file') as Blob | null
    const extension = file?.type ?? ''

    if (!file) {
      return NextResponse.json({ error: 'File blob is required.' }, { status: 400 })
    }

    const mimeType = file.type
    const fileExtension = mimeType.split('/')[1]

    const buffer = Buffer.from(await file.arrayBuffer())

    const fileName = await uploadImageToS3(
      buffer,
      crypto.randomUUID() + '.' + fileExtension,
      'avatar',
      80,
      80,
      extension
    )

    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: `${process.env.NEXT_PUBLIC_S3_BASEURL}/${fileName}`,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error uploading image:', error)
    NextResponse.json({ message: 'Error uploading image' })
  }
}
