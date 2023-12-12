'use client'

import { Check, ChevronRight, Trash2 } from 'lucide-react'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { useConfetti } from '@/components/provider/confetti-provider'
import { useModal } from '@/components/provider/modal-provider'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { getYouTubeVideoId } from '@/lib/get-youtube-video-id'
import { cn } from '@/lib/utils'
import { cupData } from '@/types/type'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  cupData: cupData
}

const urlSchema = z.object({
  url: z.string().trim().min(1, { message: '유튜브 주소를 입력해주세요' }),
})

export default function ThirdStepYoutube({ cupData }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const [links, setLinks] = useState<{ videoUrl: string; imageUrl: string }[]>([])
  const { open: openModal } = useModal()
  const { open: openConfetti } = useConfetti()
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  const thumbnail = useRef<string | null>(null)

  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: '',
    },
  })

  const onSubmitYoutubeUrlForm = (values: z.infer<typeof urlSchema>) => {
    try {
      const videoId = getYouTubeVideoId(values.url.trim())

      const isExist = links.filter((link) => link.videoUrl === `https://www.youtube.com/watch?v=${videoId}`).length > 0

      if (isExist) {
        toast.warning('이미 리스트에 있는 영상입니다. (중복 업로드)')

        return
      }

      const link = {
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        imageUrl: `https://img.youtube.com/vi/${videoId}/0.jpg`,
      }

      setLinks((prev) => [{ ...link }, ...prev])
      thumbnail.current = link.imageUrl

      form.reset()
    } catch (error) {
      toast.warning('유효하지않은 유튜브 링크입니다.')
    }
  }

  const onSubmitYoutubeUrlsForm = () => {
    if (!textAreaRef.current) return

    try {
      const inputs = textAreaRef.current.value.split('\n').filter((input) => input.trim().length > 0)
      const videoIds = inputs.map((input) => getYouTubeVideoId(input))
      const youtubeLinks = videoIds.map((videoId) => ({
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        imageUrl: `https://img.youtube.com/vi/${videoId}/0.jpg`,
      }))

      setLinks((prev) => [...youtubeLinks, ...prev])
      thumbnail.current = youtubeLinks[0].imageUrl

      textAreaRef.current.value = ''
    } catch (error) {
      toast.warning('유효하지않은 유튜브 링크입니다.')
    }
  }

  const onSubmitWorldcup = async () => {
    try {
      setIsUploading(true)

      if (links.length < 8) {
        toast.warning('유튜브 링크 개수가 부족합니다.')

        return
      }

      if (links.length > 132) {
        toast.warning('유튜브 링크 개수를 초과했습니다.')

        return
      }

      const { data } = await axios.post('/api/create/video', {
        title: cupData.title,
        description: cupData.description,
        links,
      })

      openModal('create-complete', data)
      openConfetti()

      router.push('/')
      router.refresh()
    } catch (error) {
      toast('월드컵 업로드 실패 😥')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='mt-3 w-full px-2 pb-20'>
      <div className='mt-10 font-bold tracking-tight text-lg'>
        <span className='text-blue-500'>8 ~ 132개 </span>의 링크를 업로드 할 수 있습니다
        <p className='text-sm sm:text-base text-blue-500 font-semibold mt-2'>
          업로드 이후 자유롭게 수정 가능합니다 (제목, 설명, 썸네일, 비디오)
        </p>
        <div className='mt-6 flex items-center gap-2'>
          <span className='text-sm'>현재 업로드 개수: </span>
          <span
            className={cn(
              'flex gap-1 items-center',
              links.length < 8 || links.length > 80 ? 'text-red-500' : 'text-blue-500'
            )}
          >
            {links.length}개 {!(links.length < 8 || links.length > 80) && <Check className='w-5 h-5' />}
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitYoutubeUrlForm)} className='space-y-4 mt-10'>
          <div className='space-y-2 flex flex-col'>
            <span>유튜브 링크를 복사하여 추가해주세요</span>
          </div>
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormControl className='flex gap-2'>
                  <div>
                    <Input placeholder='유튜브 링크 추가...' {...field} className='h-16' />
                    <Button type='submit' className='h-16 min-w-[8rem] font-bold'>
                      추가
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className='grid w-full gap-1.5 mt-10'>
        <p>유튜브 플레이리스트 영상 한번에 추가하기</p>
        <Label htmlFor='multiple-links'>
          <Link
            href='https://www.thetubelab.com/get-all-urls-of-youtube-playlist-channel'
            target='_blank'
            rel='noreferrer noopener'
            className='underline tracking-tighter text-blue-500'
          >
            https://www.thetubelab.com/get-all-urls-of-youtube-playlist-channel
          </Link>
        </Label>
        <div className='flex gap-2 mt-3'>
          <Textarea
            ref={textAreaRef}
            placeholder='여러 링크 한번에 추가... (엔터 키로 구분)'
            id='multiple-links'
            className='h-40'
          />
          <Button onClick={onSubmitYoutubeUrlsForm} className='h-full w-24'>
            추가
          </Button>
        </div>
      </div>

      <Button
        isLoading={isUploading}
        disabled={isUploading}
        onClick={onSubmitWorldcup}
        variant='blue'
        className='my-4 h-16 w-full font-extrabold'
      >
        <span className='flex text-primary-foreground/80'>
          월드컵 만들기
          <ChevronRight className='w-5 h-5 ml-1' />
        </span>
      </Button>

      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1'>
        {links.map(({ videoUrl, imageUrl }, i) => (
          <div key={`${imageUrl}-${i}`} className='relative group'>
            <Link href={imageUrl} target='_blank' rel='noreferrer noopener' className=' aspect-square'>
              <Image
                src={imageUrl}
                alt='preview image'
                width={200}
                height={200}
                className='rounded-lg object-cover aspect-square'
              />
            </Link>

            <button
              onClick={() => {
                setLinks((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)])
              }}
              className='absolute bottom-0 inset-x-0 bg-red-500 text-white w-full z-10 hidden group-hover:flex font-bold border-t-0 h-[30%] items-center justify-center text-xs rounded-b-lg'
            >
              <span>삭제</span>
              <Trash2 className='w-3 h-3 ml-1' />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
