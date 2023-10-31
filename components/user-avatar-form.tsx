'use client'

import type { User } from '@prisma/client'
import { FileWarning, Loader2, Pencil } from 'lucide-react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useConfetti } from './provider/confetti-provider'
import { toast } from '@/components/ui/use-toast'

type Props = {
  user: User
  // avatars: string[]
}

export default function UserAvatarForm({ user }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { open: openConfetti } = useConfetti()

  const { open: openFileUploader } = useDropzone({
    multiple: false,
    onDrop(acceptedFile) {
      if (acceptedFile[0].size > 3_000_000) {
        toast({
          description: `이미지가 3MB를 초과했습니다.`,
          variant: 'destructive',
        })

        return
      }

      onLocalImageUpload(acceptedFile[0])
    },
    accept: {
      'image/*': ['.jpeg', '.jpg', '.avif', '.gif', '.png', '.webp'],
    },
    maxFiles: 1,
  })

  const onLocalImageUpload = async (avatar: File) => {
    try {
      setIsUploading(true)

      const body = new FormData()
      body.append('file', avatar)
      body.append('previousAvatar', user.image!)

      await axios.patch(`/api/user/image/local`, body)

      router.refresh()

      toast({
        title: '이미지 변경 완료 🎊',
        style: {
          backgroundColor: '#111',
          color: '#ddd',
        },
      })

      openConfetti()
    } catch (error) {
      console.log(error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDefaultAvatar = async () => {
    try {
      await fetch('/api/user/image/default', {
        method: 'PATCH',
      })

      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <p className='flex gap-1 items-center text-xs text-blue-500 mb-4'>
        <FileWarning className='w-4 h-4' />
        <span className='font-bold'>3MB</span>이하의 이미지
      </p>
      <Popover open={open}>
        <PopoverTrigger asChild>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className='relative w-20 h-20 rounded-full group bg-white overflow-hidden flex items-center justify-center'
          >
            {isUploading ? (
              <Loader2 className='animate-spin' />
            ) : (
              <Image
                unoptimized
                width={160}
                height={160}
                src={user.image!}
                alt='user profile image'
                className='object-cover'
              />
            )}

            <span className='hidden group-hover:flex bg-black/40 inset-0 absolute rounded-full items-center justify-center'>
              <Pencil className='text-white' />
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className='flex flex-col gap-2 p-2 w-48' onInteractOutside={() => setOpen(false)}>
          <Button
            onClick={() => {
              handleDefaultAvatar()
              setOpen(false)
            }}
            variant='secondary'
          >
            기본 이미지
          </Button>
          <Button
            onClick={() => {
              openFileUploader()
              setOpen(false)
            }}
          >
            이미지 업로드
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
