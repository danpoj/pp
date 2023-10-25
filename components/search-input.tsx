'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Label } from './ui/label'
import qs from 'query-string'
import { useState, type ChangeEvent, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  const [value, setValue] = useState(search || '')
  const debounceValue = useDebounce(value, 1000)

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          search: debounceValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    )

    router.push(url)
  }, [debounceValue, router])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className='w-full max-w-[30rem] space-y-3'>
      <Label htmlFor='search' className='ml-1'>
        월드컵 검색하기
      </Label>
      <div className='relative w-full'>
        <Search className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50' />
        <Input
          onChange={onChange}
          value={value}
          placeholder='입력...'
          id='search'
          className='h-12 text-lg pr-10 w-full'
        />
      </div>
    </div>
  )
}
