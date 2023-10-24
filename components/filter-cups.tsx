'use client'

import { useSearchParams } from 'next/navigation'
import qs from 'query-string'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Youtube } from 'lucide-react'
import HeartEmoji from '@/components/heart-emoji'

export default function FilterCups() {
  const searchParams = useSearchParams()

  let type = searchParams.get('type') ?? 'all'

  if (!(type === 'all' || type === 'video' || type === 'image')) type = 'all'

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
    <section className='py-6 px-2 mx-2 flex gap-6 items-start sm:items-center shrink-0 flex-col sm:flex-row'>
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
    </section>
  )
}
