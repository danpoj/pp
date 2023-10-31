import { PutObjectCommand } from '@aws-sdk/client-s3'
import { S3Client } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string,
  },
})

export async function uploadImageToS3(file: Buffer, fileName: string): Promise<string> {
  // const resizedImageBuffer = await sharp(file).resize(400, 500).toBuffer()

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME as string,
    Key: fileName,
    Body: file,
    ContentType: 'image/gif',
  })

  await s3.send(command)

  return fileName
}
