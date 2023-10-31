import { DeleteObjectCommand, DeleteObjectsCommand, S3Client } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string,
  },
})

export async function deleteImagesFromS3(Objects: { Key: string }[]) {
  const command = new DeleteObjectsCommand({
    Bucket: process.env.BUCKET_NAME as string,
    Delete: {
      Objects,
    },
  })

  try {
    await s3.send(command)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteImageFromS3(Key: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME as string,
    Key,
  })

  try {
    await s3.send(command)
  } catch (error) {
    console.log(error)
    throw error
  }
}
