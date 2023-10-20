'use client'

import { cupData } from '@/app/(main)/create/page'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { ChevronRight, ImagePlus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useConfetti } from '../provider/confetti-provider'
import { useModal } from '../provider/modal-provider'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'

type Props = {
  cupData: cupData
}

export default function Step3Image({ cupData }: Props) {
  const [images, setImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { open: openModal } = useModal()
  const { open: openConfetti } = useConfetti()
  const router = useRouter()

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      const filteredLargeFiles = acceptedFiles.filter((file) => file.size <= 4_000_000)

      if (filteredLargeFiles.length !== acceptedFiles.length) {
        toast({
          description: `${acceptedFiles.length - filteredLargeFiles.length}개의 파일이 4MB용량을 넘어 제외되었습니다.`,
          variant: 'destructive',
        })
      }

      filteredLargeFiles.map((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          setImages((prev) => [reader.result as string, ...prev])
        }
        reader.readAsDataURL(file)
      })
    },
    accept: {
      'image/*': ['.jpeg', '.jpg', '.avif', '.gif', '.png', '.webp'],
    },
    maxFiles: 100,
  })

  const upload = async () => {
    try {
      setIsUploading(true)

      const promises = images.map((image) => axios.post('/api/cloudinary/upload', { image }))
      const responses = await Promise.all(promises)
      const cldImages = responses.map(({ data }) => ({ ...data }))

      const { data } = await axios.post('/api/create/image', {
        images: cldImages,
        ...cupData,
      })

      openModal('create-complete', data)

      router.refresh()
      router.push('/')

      openConfetti()
    } catch (error) {
      console.log(error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='mt-4 w-full h-full pb-20 overflow-hidden relative'>
      <div
        {...getRootProps()}
        className={cn(
          'w-full h-full border-[3px] border-dashed transition cursor-pointer relative  overflow-y-scroll',
          isDragAccept && 'border-blue-500',
          isDragReject && 'border-rose-500'
        )}
      >
        <input {...getInputProps()} />
        {images.length === 0 && (
          <ImagePlus className='w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/40' />
        )}

        <div className='space-y-2 p-6 pb-2 text-xs sm:text-sm'>
          <p className='truncate'>8개~100개의 이미지를 업로드 할 수 있습니다 (각 4Mb 이하의 이미지)</p>
          <p className='truncate'>이미지 개수에 따라 8, 16, 32, 64강의 월드컵이 만들어집니다</p>
        </div>

        <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 2xl:grid-cols-8 gap-1.5 py-4 px-2'>
          {images.map((image, i) => (
            <div key={i} className='aspect-square rounded-lg overflow-hidden relative group'>
              <Image fill src={image} alt='preview image' className='object-cover w-full h-full' />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setImages((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)])
                }}
                className='absolute bottom-0 w-full opacity-90 rounded-none hidden group-hover:flex bg-slate-900 h-10 text-white gap-1 items-center justify-center text-xs'
              >
                삭제
                <Trash2 className='w-3 h-3' />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full flex justify-end mt-4 items-center gap-4'>
        <span className={cn('text-3xl', images.length < 8 || images.length > 100 ? 'text-red-600' : 'text-blue-600')}>
          {images.length}개
        </span>
        <Button
          onClick={upload}
          disabled={images.length < 8 || images.length > 100 || isUploading}
          isLoading={isUploading}
          className='h-12 w-40'
          variant='blue'
        >
          다음 단계 <ChevronRight className='w-5 h-5 ml-1' />
        </Button>
      </div>
    </div>
  )
}
