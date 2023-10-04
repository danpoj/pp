import { v2 as cloudinary } from 'cloudinary'
import Image from 'next/image'

type Images = {
  total_count: number
  resources: {
    secure_url: string
  }[]
}

export default async function Page() {
  const images: Images = await cloudinary.search.expression('folder:image-tset').execute()

  return (
    <div>
      {images.resources.map((image) => (
        <Image src={image.secure_url} key={image.secure_url} width={300} height={300} alt='tset' />
      ))}
    </div>
  )
}
