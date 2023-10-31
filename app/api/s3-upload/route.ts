import { NextRequest, NextResponse } from 'next/server'
import { uploadImageToS3 } from '@/lib/upload-image-to-s3'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const formData = await request.formData()

    const file = formData.get('file') as Blob | null
    const width = formData.get('width')
    const height = formData.get('height')

    if (!file) {
      return NextResponse.json({ error: 'File blob is required.' }, { status: 400 })
    }

    const mimeType = file.type
    const fileExtension = mimeType.split('/')[1]

    const buffer = Buffer.from(await file.arrayBuffer())

    const fileName = await uploadImageToS3(buffer, crypto.randomUUID() + '.' + fileExtension)

    return NextResponse.json({
      fileName,
      width,
      height,
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    NextResponse.json({ message: 'Error uploading image' })
  }
}
