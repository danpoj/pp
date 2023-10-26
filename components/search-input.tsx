'use client'

import { Input } from '@/components/ui/input'
import { Loader2, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Label } from './ui/label'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  const [value, setValue] = useState(search || '')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          search: value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    )

    router.push(url)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className='w-full max-w-[30rem] space-y-3'>
      <Label htmlFor='search' className='ml-1'>
        월드컵 검색하기
      </Label>
      <form onSubmit={onSubmit} className='relative w-full overflow-hidden rounded-lg'>
        <Input
          onChange={onChange}
          value={value}
          placeholder='입력...'
          id='search'
          className='h-12 text-lg pr-10 w-full'
        />

        <button
          type='submit'
          className='absolute right-0 top-1/2 -translate-y-1/2 text-primary/50 bg-primary/10 h-full w-16 flex items-center justify-center hover:bg-primary/20 hover:text-primary/60 transition'
        >
          <Search className='w-5 h-5' />
        </button>
      </form>
    </div>
  )
}
