'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Youtube } from 'lucide-react'
import HeartEmoji from './heart-emoji'

export default function FilterCups() {
  const searchParams = useSearchParams()

  let type = searchParams.get('type') ?? 'all'
  let order = searchParams.get('order') ?? 'popular'

  if (!(type === 'all' || type === 'video' || type === 'image')) type = 'all'
  if (!(order === 'popular' || order === 'like' || order === 'newest')) order = 'popular'

  const pushQuery = (query: { [key: string]: string }) => {
    const url = qs.stringifyUrl({
      url: window.location.href,
      query: {
        ...query,
      },
    })

    window.location.href = url
  }

  return (
    <div className='py-6 px-2 mx-2 flex gap-6 items-start sm:items-center shrink-0 flex-col sm:flex-row'>
      <RadioGroup value={type}>
        <div
          onClick={() =>
            pushQuery({
              type: 'all',
            })
          }
          className='flex items-center space-x-2'
        >
          <RadioGroupItem value='all' id='all' />
          <Label htmlFor='all' className='flex gap-1 items-center cursor-pointer'>
            <div className='bg-fancy px-2 py-1 rounded text-white font-bold text-xs text-center'>이미지</div>
            <span className='font-bold'>+</span>
            <div className='flex items-center gap-1 bg-[#f00] text-white text-xs rounded px-2 py-1 font-bold'>
              <Youtube className='w-4 h-4' /> 유튜브
            </div>
          </Label>
        </div>
        <div
          onClick={() =>
            pushQuery({
              type: 'video',
            })
          }
          className='flex items-center space-x-2'
        >
          <RadioGroupItem value='video' id='video' />
          <Label
            htmlFor='video'
            className='flex items-center gap-1 bg-[#f00] text-white text-xs rounded px-2 py-1 font-bold cursor-pointer'
          >
            <Youtube className='w-4 h-4' /> 유튜브
          </Label>
        </div>
        <div
          onClick={() =>
            pushQuery({
              type: 'image',
            })
          }
          className='flex items-center space-x-2'
        >
          <RadioGroupItem value='image' id='image' />
          <Label htmlFor='image' className='bg-fancy px-2 py-1 rounded text-white font-bold text-xs cursor-pointer'>
            이미지
          </Label>
        </div>
      </RadioGroup>

      <RadioGroup value={order} className='flex flex-col gap-4'>
        <div
          onClick={() =>
            pushQuery({
              order: 'popular',
            })
          }
          className='flex items-center space-x-2'
        >
          <RadioGroupItem value='popular' id='popular' />
          <Label htmlFor='popular' className='cursor-pointer font-semibold'>
            인기(플레이) 순
          </Label>
        </div>
        <div
          onClick={() =>
            pushQuery({
              order: 'like',
            })
          }
          className='flex items-center space-x-2'
        >
          <RadioGroupItem value='like' id='like' />
          <Label htmlFor='like' className='flex items-center gap-0.5 cursor-pointer font-semibold'>
            <HeartEmoji className='w-3 h-3 fill-red-500 stroke-red-500' />
            좋아요 순
          </Label>
        </div>
        <div
          onClick={() =>
            pushQuery({
              order: 'newest',
            })
          }
          className='flex items-center space-x-2'
        >
          <RadioGroupItem value='newest' id='newest' />
          <Label htmlFor='newest' className='cursor-pointer font-semibold'>
            최신 순
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
