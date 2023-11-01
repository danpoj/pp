import { PutObjectCommand } from '@aws-sdk/client-s3'
import { S3Client } from '@aws-sdk/client-s3'
import sharp from 'sharp'

const s3 = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string,
  },
})

export async function uploadImageToS3(
  file: Buffer,
  fileName: string,
  type: 'avatar' | 'cup',
  width: number,
  height: number,
  extension: string
): Promise<string> {
  let resizedImageBuffer

  if (type === 'avatar') {
    resizedImageBuffer = await sharp(file)
      .webp()
      .resize(160, 160, {
        fit: 'cover',
      })
      .toBuffer()
  } else if (type === 'cup') {
    if (extension === 'image/gif') {
      if (width > 540 || height > 540) {
        resizedImageBuffer = await sharp(file, { animated: true })
          .gif({
            dither: 0,
          })
          .resize({
            width: Math.floor(width / 1.8),
            height: Math.floor(height / 1.8),
          })
          .toBuffer()
      } else {
        resizedImageBuffer = await sharp(file, { animated: true })
          .gif({
            dither: 0,
          })
          .resize({
            width: Math.floor(width / 1.4),
            height: Math.floor(height / 1.4),
          })
          .toBuffer()
      }
    } else if (width > 1400 || height > 1400) {
      resizedImageBuffer = await sharp(file)
        .webp()
        .resize(Math.floor(width / 1.8), Math.floor(height / 1.8))
        .toBuffer()
    } else if (width > 1000 || height > 1000) {
      resizedImageBuffer = await sharp(file)
        .webp()
        .resize(Math.floor(width / 1.4), Math.floor(height / 1.4))
        .toBuffer()
    } else {
      resizedImageBuffer = await sharp(file)
        .webp()
        .resize(Math.floor(width / 1.1), Math.floor(height / 1.1))
        .toBuffer()
    }
  }

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME as string,
    Key: fileName,
    Body: resizedImageBuffer,
    ContentType: 'image/webp',
  })

  await s3.send(command)

  return fileName
}
