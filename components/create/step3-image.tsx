'use client'

import { ArrowLeft, ChevronRight, ImagePlus, Sparkle, Trash2 } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'

import { useConfetti } from '@/components/provider/confetti-provider'
import { useModal } from '@/components/provider/modal-provider'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { cupData } from '@/types/type'
import axios from 'axios'
import NextImage from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
  cupData: cupData
}

type Img = {
  src: File
  width: number
  height: number
  base64: string
}

export default function Step3Image({ cupData }: Props) {
  const [images, setImages] = useState<Img[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { open: openModal } = useModal()
  const { open: openConfetti } = useConfetti()
  const router = useRouter()

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop: (acceptedFiles) => {
      const filteredLargeFiles = acceptedFiles.filter((file) => file.size <= 2_500_000)

      if (filteredLargeFiles.length !== acceptedFiles.length) {
        toast({
          description: `${
            acceptedFiles.length - filteredLargeFiles.length
          }개의 파일이 2.5MB용량을 넘어 제외되었습니다.`,
          variant: 'destructive',
        })
      }

      filteredLargeFiles.map((file) => {
        const img = new Image()
        img.src = URL.createObjectURL(file)
        img.onload = () => {
          const image: Img = {
            src: file,
            width: img.width,
            height: img.height,
            base64: URL.createObjectURL(file),
          }

          setImages((prev) => [image, ...prev])
        }
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

      const promises = images.map((image) => {
        const body = new FormData()
        body.append('file', image.src)
        body.append('width', image.width.toString())
        body.append('height', image.height.toString())

        const promise = fetch('/api/s3-upload', {
          method: 'POST',
          body,
        })
        return promise
      })

      const response = await Promise.all(promises)

      const s3ImagePromises = response.map((res) => res.json())

      const s3Images = await Promise.all(s3ImagePromises)

      const { data } = await axios.post('/api/create/image', {
        images: s3Images,
        ...cupData,
      })

      router.push('/')

      router.refresh()

      openModal('create-complete', data)
      openConfetti()
    } catch (error) {
      toast({
        title: '월드컵 업로드 실패',
        description: 'upload failed.',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const isUploadAvailable = !(images.length < 8 || images.length > 100)

  if (isUploading) {
    return (
      <div className='w-full h-full pb-20 overflow-hidden fixed inset-0 bg-primary/20 flex flex-col items-center justify-center space-y-2 z-50'>
        <div className='flex items-center gap-4 animate-bounce'>
          <span className='font-bold text-lg'>업로드 중 ...</span>
          <NextImage
            src='/loader.gif'
            unoptimized
            width={48}
            height={32}
            alt='loader image'
            className='w-[48px] h-[32px] object-cover'
          />
        </div>

        <div className='flex flex-col items-center gap-2 py-10 '>
          <p className='text-blue-500'>업로드가 될 동안 기다려주세요</p>
          <p>약 10초 소요...</p>
        </div>

        {/* <Link href='/' className={cn(buttonVariants(), 'flex mt-10')}>
          <ArrowLeft className='w-4 h-4 mr-1' />
          <span>홈으로 이동하기</span>
        </Link> */}
      </div>
    )
  }

  // if (step === 'finished') {
  //   return (
  //     <div className='mt-4 w-full h-full pb-20 overflow-hidden relative flex flex-col items-center justify-center space-y-6'>
  //       <div className='flex items-center gap-4'>
  //         <span className='font-bold text-lg flex gap-1 items-center'>
  //           업로드 완료! <Sparkle className='w-5 h-5 fill-yellow-400 stroke-yellow-400' />
  //         </span>
  //         <NextImage
  //           src='/loader.gif'
  //           unoptimized
  //           width={48}
  //           height={32}
  //           alt='loader image'
  //           className='w-[48px] h-[32px] object-cover'
  //         />
  //       </div>

  //       <Link href='/my/cup' className={cn(buttonVariants(), 'flex mt-10')}>
  //         <ArrowLeft className='w-4 h-4 mr-1' />
  //         <span>월드컵 설정하기</span>
  //       </Link>
  //     </div>
  //   )
  // }

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
          <p className='truncate'>8개~100개의 이미지를 업로드 할 수 있습니다 (각 3Mb 이하의 이미지)</p>
          <p className='truncate'>이미지 개수에 따라 8, 16, 32, 64강의 월드컵이 만들어집니다</p>
          <p className='truncate font-bold pt-4 text-center text-blue-500'>
            업로드 이후 자유롭게 수정 가능합니다 (제목, 설명, 썸네일, 이미지)
          </p>
        </div>

        <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 2xl:grid-cols-8 gap-1.5 py-4 px-2'>
          {images.map((image, i) => (
            <div key={i} className='aspect-square rounded-lg overflow-hidden relative group'>
              <NextImage fill src={image.base64} alt='preview image' className='object-cover w-full h-full' />
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
        <span className={cn('text-3xl', isUploadAvailable ? 'text-blue-600' : 'text-red-600')}>{images.length}개</span>
        <Button onClick={upload} disabled={!isUploadAvailable} className='h-12 w-40' variant='blue'>
          업로드 <ChevronRight className='w-5 h-5 ml-1' />
        </Button>
      </div>
    </div>
  )
}
