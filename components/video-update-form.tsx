'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { getYouTubeVideoId } from '@/lib/get-youtube-video-id'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Cup, Item } from '@prisma/client'
import axios from 'axios'
import { Check, ChevronRight, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  cup: Cup & {
    _count: {
      items: number
      comments: number
      likes: number
    }
    items: Item[]
  }
}

const urlSchema = z.object({
  url: z.string().min(2, { message: '이미지 주소를 넣어주세요.' }).max(20000, { message: '이미지 주소 길이 초과.' }),
})

export default function VideoUpdateForm({ cup }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const [links, setLinks] = useState<{ videoUrl: string; imageUrl: string }[]>([])

  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: '',
    },
  })

  const onSubmitYoutubeUrlForm = (values: z.infer<typeof urlSchema>) => {
    try {
      const videoId = getYouTubeVideoId(values.url)

      const isExist =
        [...links, ...cup.items.map((cup) => ({ videoUrl: cup.url }))].filter(
          (link) => link.videoUrl === `https://www.youtube.com/watch?v=${videoId}`
        ).length > 0

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

      form.reset()
      form.setFocus('url')
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

      if (totalVideoLength > 100) {
        toast({
          title: '총 유튜브 영상 개수는 100개를 넘길 수 없습니다',
          description: '100개 이하의 유튜브 영상을 올려주세요',
          variant: 'destructive',
        })

        return
      }

      if (links.length === 0) {
        toast({
          title: '유튜브 링크를 올려주세요',
          variant: 'destructive',
        })

        return
      }

      const { data } = await axios.post(`/api/cup/${cup.id}/item/video`, {
        links,
      })

      router.refresh()
      setLinks([])

      toast({
        title: '유튜브 영상 추가 완료',
        style: {
          backgroundColor: '#111',
          color: '#ddd',
        },
      })
    } catch (error) {
      toast({
        title: '유튜브 영상 업로드 실패',
        description: 'upload failed.',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const totalVideoLength = cup._count.items + links.length

  return (
    <div className='mt-3 w-full px-2 mb-10'>
      <div className='mt-10 font-bold tracking-tight text-lg'>
        <span className='text-blue-500'>{100 - totalVideoLength}개 </span>이하의 링크를 업로드 할 수 있습니다
        <div className='mt-6 flex items-center gap-2'>
          <span className='text-sm'>현재 업로드 개수: </span>
          <span
            className={cn(
              'flex gap-1 items-center',
              totalVideoLength > 100 || links.length === 0 ? 'text-red-500' : 'text-blue-500'
            )}
          >
            {links.length}개 {!(totalVideoLength > 100 || links.length === 0) && <Check className='w-5 h-5' />}
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
        disabled={isUploading || totalVideoLength > 100 || links.length === 0}
        onClick={onSubmitWorldcup}
        className='my-4 h-16 w-full font-extrabold'
      >
        <span className='flex text-primary-foreground/80'>
          링크 추가하기
          <ChevronRight className='w-5 h-5 ml-1' />
        </span>
      </Button>

      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1'>
        {links.map(({ videoUrl, imageUrl }, i) => (
          <div key={`${imageUrl}-${i}`} className='relative group'>
            <Link href={imageUrl} rel='noreferrer noopener' className=' aspect-square'>
              <Image
                unoptimized
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
