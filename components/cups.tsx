'use client'

import db from '@/lib/db'
import { useIntersection } from '@mantine/hooks'
import { Cup } from '@prisma/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ChevronRight, YoutubeIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { BlurredImage } from './blurred-image'
import { buttonVariants } from './ui/button'
import { ClipboardButton } from './clipboard-button'

type Props = {
  initialCups: Cup[]
}

export default function Cups({ initialCups }: Props) {
  const lastCupRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastCupRef.current,
    threshold: 1,
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['cups'],
    async ({ pageParam = 1 }) => {
      const data = await db.cup.findMany({
        skip: pageParam,
        take: 10,
      })

      return data as Cup[]
    },

    {
      getNextPageParam: (page, pages) => {
        // if (page.isLast) {
        //   return undefined
        // }

        return pages.length + 1
      },

      initialData: {
        pages: [initialCups],
        pageParams: [0],
      },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [fetchNextPage, entry?.isIntersecting])

  const cups = data?.pages.flatMap((page) => page) ?? initialCups

  return (
    <>
      {cups.map((cup, index) => (
        <div
          ref={index === cups.length - 1 ? null : null}
          key={cup.id}
          className='rounded-lg overflow-hidden shadow-lg dark:bg-border/20 border'
        >
          <Link
            href={`/cup/${cup.id}`}
            target='_blank'
            rel='noopenner noreferrer'
            className='hover:opacity-90 transition group'
          >
            <div className='relative w-full h-[28rem] sm:h-[18rem] overflow-hidden'>
              {cup.thumbnail ? <BlurredImage thumbnail={cup.thumbnail} title={cup.title} /> : <div>no image.</div>}

              {cup.type === 'VIDEO' ? (
                <div className='absolute left-2 top-2 bg-[#f00] text-xs text-[10px] px-2 py-1 rounded text-white font-bold flex gap-1 capitalize'>
                  <YoutubeIcon className='w-4 h-4' /> 유튜브
                </div>
              ) : (
                <div className='absolute left-2 top-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-xs text-[10px] px-2 py-1 rounded text-white font-bold'>
                  이미지
                </div>
              )}
            </div>
          </Link>
          <div className='h-full flex flex-col px-2 pt-2 pb-3'>
            <p className='truncate text-lg'>{cup.title}</p>
            <p className='truncate text-xs text-primary/50 font-medium'>{cup.description}</p>

            <div className='flex items-center gap-1 mt-4'>
              <Link
                href={`/cup/${cup.id}/ranking`}
                className={buttonVariants({ className: 'flex-1 text-xs', size: 'sm', variant: 'outline' })}
              >
                랭킹보기 <ChevronRight className='w-4 h-4 ml-0.5' />
              </Link>
              <ClipboardButton path={`/cup/${cup.id}`} />
            </div>
          </div>
        </div>
      ))}

      {isFetchingNextPage && (
        <div className='bg-primary/10 h-40 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-4 2xl:col-span-5' />
      )}
    </>
  )
}
