'use client'

import { ChevronRight, ImagePlus, Trash2 } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import axios from 'axios'
import { cupData } from '@/app/(main)/create/page'
import { useRouter } from 'next/navigation'
import { useModal } from '../provider/modal-provider'
import { useConfetti } from '../provider/confetti-provider'

type Props = {
  cupData: cupData
}

export default function Step3({ cupData }: Props) {
  const [images, setImages] = useState<string[]>([])
  const router = useRouter()
  const { open: openModal } = useModal()
  const { open: openConfetti } = useConfetti()

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      acceptedFiles.map((file) => {
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
      const { data } = await axios.post('/api/create', {
        images,
        ...cupData,
      })

      router.push('/')
      router.refresh()
      openModal('create-complete', data)
      openConfetti()
    } catch (error) {
      console.log(error)
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
          <p className='truncate'>8개~100개의 이미지를 업로드 할 수 있습니다</p>
          <p className='truncate'>이미지 개수에 따라 8, 16, 32, 64강의 월드컵이 만들어집니다</p>
        </div>

        <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 2xl:grid-cols-8 gap-1.5 py-4 px-2'>
          {images.map((image, i) => (
            <div key={i} className='aspect-square rounded-lg overflow-hidden relative group'>
              <img src={image} alt='preview image' className='object-cover w-full h-full' />
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
          disabled={images.length < 8 || images.length > 100}
          className='h-12 w-40'
          variant='blue'
        >
          다음 단계 <ChevronRight className='w-5 h-5 ml-1' />
        </Button>
      </div>
    </div>
  )
}
