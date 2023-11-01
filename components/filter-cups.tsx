'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { Youtube } from 'lucide-react'
import { TypeCupSearchParams } from '@/types/type'

export default function FilterCups() {
  const searchParams = useSearchParams()
  const router = useRouter()

  let type = (searchParams.get('type') ?? 'all') as TypeCupSearchParams

  if (!(type === 'video' || type === 'image')) type = 'all'

  const pushQuery = (query: { type: string }) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    )

    router.replace(url)
  }

  return (
    <section className='py-6 px-2 mx-2 flex gap-6 items-start sm:items-center shrink-0 flex-col sm:flex-row'>
      <RadioGroup value={type} className=''>
        <button
          onClick={() =>
            pushQuery({
              type: 'all',
            })
          }
          className='flex items-center space-x-2'
        >
          <Label
            htmlFor='all'
            className={cn(
              'flex gap-1 items-center cursor-pointer p-1 rounded hover:opacity-90 transition-opacity',
              type === 'all' ? 'grayscale-0' : 'grayscale'
            )}
          >
            <div className='bg-fancy px-2 py-1 rounded text-white font-bold text-xs text-center'>이미지</div>
            <span className='font-bold'>+</span>
            <div className='flex items-center gap-1 bg-[#f00] text-white text-xs rounded px-2 py-1 font-bold'>
              <Youtube className='w-4 h-4' /> 유튜브
            </div>
          </Label>
        </button>
        <button
          onClick={() =>
            pushQuery({
              type: 'video',
            })
          }
          className={cn(
            'flex space-x-2 p-1 rounded items-center hover:opacity-90 transition-opacity',
            type === 'video' ? 'grayscale-0' : 'grayscale'
          )}
        >
          <Label
            htmlFor='video'
            className='flex items-center gap-1 bg-[#f00] text-white text-xs rounded px-2 py-1 font-bold cursor-pointer'
          >
            <Youtube className='w-4 h-4' /> 유튜브
          </Label>
        </button>
        <button
          onClick={() =>
            pushQuery({
              type: 'image',
            })
          }
          className={cn(
            'flex space-x-2 p-1 rounded items-center hover:opacity-90 transition-opacity',
            type === 'image' ? 'grayscale-0' : 'grayscale'
          )}
        >
          <Label htmlFor='image' className='bg-fancy px-2 py-1 rounded text-white font-bold text-xs cursor-pointer'>
            이미지
          </Label>
        </button>
      </RadioGroup>
    </section>
  )
}
