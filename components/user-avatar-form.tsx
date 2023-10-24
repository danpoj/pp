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
  avatars: string[]
}

export default function UserAvatarForm({ user, avatars }: Props) {
  const [isDefaultAvatars, setIsDefaultAvatars] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { open: openConfetti } = useConfetti()

  const { open: openFileUploader } = useDropzone({
    multiple: false,
    onDrop(acceptedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        onLocalImageUpload(reader.result as string)
      }
      reader.readAsDataURL(acceptedFile[0])
    },
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
  })

  const onLocalImageUpload = async (avatar: string) => {
    try {
      setIsUploading(true)

      await axios.patch(`/api/user/image/local`, { avatar })

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

  const onDefaultAvatarClick = async (avatar: string) => {
    try {
      setIsUploading(true)

      await axios.patch(`/api/user/image/default`, { avatar })

      router.refresh()

      toast({
        title: '이미지 변경 완료 🥳',
        style: {
          backgroundColor: '#111',
          color: '#ddd',
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsDefaultAvatars(false)
      setIsUploading(false)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <p className='flex gap-1 items-center text-xs text-blue-500'>
        <FileWarning className='w-4 h-4' />
        <span className='font-bold'>4MB</span>이하의 이미지
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
              <Image fill src={user.image!} alt='user profile image' className='object-cover' />
            )}

            <span className='hidden group-hover:flex bg-black/40 inset-0 absolute rounded-full items-center justify-center'>
              <Pencil className='text-white' />
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className='flex flex-col gap-2 p-2 w-48' onInteractOutside={() => setOpen(false)}>
          <Button
            onClick={() => {
              setIsDefaultAvatars((prev) => !prev)
              setOpen(false)
            }}
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

      <Popover open={isDefaultAvatars}>
        <PopoverTrigger />
        <PopoverContent
          className='w-[220px] p-4 flex flex-wrap gap-2'
          onInteractOutside={() => setIsDefaultAvatars(false)}
        >
          {avatars.map((avatar) => (
            <button
              onClick={() => onDefaultAvatarClick(avatar)}
              key={avatar}
              className='hover:outline hover:outline-slate-400 w-14 h-14 relative rounded-full bg-white'
            >
              <Image src={avatar} alt='default profile image' fill className='p-3' />
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
