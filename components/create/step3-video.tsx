'use client'

import { cn } from '@/lib/utils'
import { Check, ChevronRight, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import { toast } from '../ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getYouTubeVideoId } from '@/lib/get-youtube-video-id'
import axios from 'axios'
import { cupData } from '@/app/(main)/create/page'
import { useModal } from '../provider/modal-provider'
import { useConfetti } from '../provider/confetti-provider'

type Props = {
  cupData: cupData
}

const urlSchema = z.object({
  url: z.string().min(2, { message: '이미지 주소를 넣어주세요.' }).max(20000, { message: '이미지 주소 길이 초과.' }),
})

export default function ThirdStepYoutube({ cupData }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const [links, setLinks] = useState<{ videoUrl: string; imageUrl: string }[]>([])
  const { open: openModal } = useModal()
  const { open: openConfetti } = useConfetti()

  const thumbnail = useRef<string | null>(null)

  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: '',
    },
  })

  const onSubmitYoutubeUrlForm = (values: z.infer<typeof urlSchema>) => {
    try {
      const videoId = getYouTubeVideoId(values.url)

      const isExist = links.filter((link) => link.videoUrl === `https://www.youtube.com/watch?v=${videoId}`).length > 0

      if (isExist) {
        toast({
          title: '링크 중복 업로드',
          description: '이미 리스트에 존재하는 링크입니다.',
          variant: 'destructive',
        })

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
      toast({
        title: '유효하지않은 유튜브 링크입니다',

        variant: 'destructive',
      })
    }
  }

  const onSubmitWorldcup = async () => {
    try {
      setIsUploading(true)

      if (links.length < 8) {
        toast({
          title: '유튜브 링크 개수가 부족합니다.',
          description: '8개 이상의 유튜브 링크를 업로드 해주세요.',
          variant: 'destructive',
        })

        return
      }

      if (links.length > 80) {
        toast({
          title: '유튜브 링크 개수를 초과했습니다.',
          description: '80개 이하의 유튜브 링크를 업로드 해주세요.',
          variant: 'destructive',
        })

        return
      }

      const { data } = await axios.post('/api/create/video', {
        title: cupData.title,
        description: cupData.description,
        links,
      })

      openModal('create-complete', data)
      openConfetti()

      router.refresh()
      router.push('/')
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

  return (
    <div className='mt-3 w-full px-2'>
      <div className='flex justify-center mt-2'>
        {thumbnail.current ? (
          <div className='h-48 relative aspect-video'>
            <Image fill src={thumbnail.current} className='absolute object-cover rounded-lg' alt='youtube thumbnail' />
          </div>
        ) : (
          <div className='h-48 aspect-video bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-lg text-slate-200 flex items-center justify-center flex-col gap-2'>
            <span className='text-xl font-black tracking-tight'>썸네일 이미지</span>
            <span className='tracking-tight text-sm font-bold text-center'>
              마지막으로 업로드한 영상이
              <br /> 썸네일 이미지가 됩니다.
            </span>
          </div>
        )}
      </div>

      <div className='mt-10 font-bold tracking-tight text-lg'>
        <span className='text-blue-500'>8 ~ 100개 </span>의 링크를 업로드 할 수 있습니다
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
        <form onSubmit={form.handleSubmit(onSubmitYoutubeUrlForm)} className='space-y-8 mt-6'>
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormControl className='flex gap-2'>
                  <div>
                    <Input placeholder='유튜브 링크 추가...' {...field} className='h-16' />
                    <Button variant='ghost' type='submit' className='h-16 min-w-[8rem] font-bold'>
                      추가
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>유튜브 링크를 복사하여 추가해주세요</FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Button
        isLoading={isUploading}
        disabled={isUploading}
        onClick={onSubmitWorldcup}
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
            <Link href={imageUrl} rel='noreferrer noopener' className=' aspect-square'>
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