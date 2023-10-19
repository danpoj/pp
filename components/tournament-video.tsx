'use client'

import type { Item, Prisma } from '@prisma/client'
import { CupLength } from './tournament'
import { shuffle } from '@/lib/shuffle'
import { CldImage } from 'next-cloudinary'
import { useEffect, useRef, useState } from 'react'
import { motion as m } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Player } from './player'
import { Button } from './ui/button'
import { updateCupPlayCountAndItemWinCount } from '@/lib/update-cup-playcount-and-item-wincount'
import DescriptionText from './description-text'

type Props = {
  cup: Prisma.CupGetPayload<{
    include: {
      items: true
    }
  }>
  cupLength: CupLength
}

export default function TournamentVideo({ cup, cupLength }: Props) {
  const [items, setItems] = useState(() => shuffle(cup.items).slice(0, cupLength))
  const [clicked, setClicked] = useState<'LEFT' | 'RIGHT' | 'INITIAL'>('INITIAL')
  const [index, setIndex] = useState(0)

  const selectedItems = useRef<Item[]>([])
  const selectedItem = useRef<Item | null>(null)
  const limit = useRef<number>(cupLength / 2)

  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClicked('INITIAL')
    }, 1600)

    return () => clearTimeout(timeout)
  }, [index])

  const onLeftClick = async (itemId: string) => {
    setClicked('LEFT')
    selectedItem.current = items[index * 2]

    if (limit.current === 1) {
      try {
        await updateCupPlayCountAndItemWinCount({
          cupId: cup.id,
          itemId: itemId,
        })
      } catch (error) {
        console.log('cup playcount / item wincount update failed', error)
      } finally {
        router.push(`/cup/${cup.id}/${items[index * 2].id}`)
      }
    } else if (index + 1 >= limit.current) {
      selectedItems.current.push(items[index * 2])
      limit.current /= 2
      setIndex(0)
      setItems(shuffle(selectedItems.current))
      selectedItems.current = []
    } else {
      selectedItems.current.push(items[index * 2])
      setIndex((prev) => prev + 1)
    }
  }

  const onRightClick = async (itemId: string) => {
    setClicked('RIGHT')
    selectedItem.current = items[index * 2 + 1]

    if (limit.current === 1) {
      try {
        await updateCupPlayCountAndItemWinCount({
          cupId: cup.id,
          itemId: itemId,
        })
      } catch (error) {
        console.log('cup playcount / item wincount update failed', error)
      } finally {
        router.push(`/cup/${cup.id}/${items[index * 2 + 1].id}`)
      }
    } else if (index + 1 >= limit.current) {
      selectedItems.current.push(items[index * 2 + 1])
      limit.current /= 2
      setIndex(0)
      setItems(shuffle(selectedItems.current))
      selectedItems.current = []
    } else {
      selectedItems.current.push(items[index * 2 + 1])
      setIndex((prev) => prev + 1)
    }
  }

  return (
    <div className='h-full flex items-center justify-center flex-col md:flex-row relative bg-black'>
      <div className='bg-black/70 w-full h-14 fixed top-0 z-50 mt-12 text-white flex gap-3 items-center justify-center'>
        <h1 className='text-lg'>{`${cup.title} ${limit.current === 1 ? '결승전' : limit.current * 2 + '강'}`}</h1>
        <span className='text-xl'>
          ({index + 1}/{limit.current})
        </span>
      </div>

      <Initial onLeftClick={onLeftClick} onRightClick={onRightClick} items={items} index={index} clicked={clicked} />

      {clicked === 'LEFT' && <Left selectedItem={selectedItem.current!} />}
      {clicked === 'RIGHT' && <Right selectedItem={selectedItem.current!} />}
    </div>
  )
}

const Left = ({ selectedItem }: { selectedItem: Item }) => {
  return (
    <m.div
      animate={{ left: '50%', translateX: '-50%' }}
      transition={{
        duration: 0.2,
      }}
      className='w-[80%] aspect-video absolute left-0'
    >
      <Player url={selectedItem.url} width='100%' height='100%' />
      <DescriptionText description={selectedItem.description} />
    </m.div>
  )
}

const Right = ({ selectedItem }: { selectedItem: Item }) => {
  return (
    <m.div
      animate={{ right: '50%', translateX: '50%' }}
      transition={{
        duration: 0.2,
      }}
      className='w-[80%] aspect-video absolute right-0'
    >
      <Player url={selectedItem.url} width='100%' height='100%' />
      <DescriptionText description={selectedItem.description} />
    </m.div>
  )
}

const Initial = ({
  onLeftClick,
  onRightClick,
  items,
  index,
  clicked,
}: {
  onLeftClick: (itemId: string) => void
  onRightClick: (itemId: string) => void
  items: Item[]
  index: number
  clicked: 'LEFT' | 'RIGHT' | 'INITIAL'
}) => {
  return (
    <div className={cn('w-full h-full', clicked === 'INITIAL' ? 'opacity-100' : 'opacity-0')}>
      <div
        onClick={() => onLeftClick(items[index * 2].id)}
        className='w-full h-[50%] sm:w-[50%] sm:h-full absolute top-0 sm:left-0'
      >
        <div className='w-full h-[84%] sm:h-[89%]'>
          <Player url={items[index * 2].url} width='100%' height='100%' />
        </div>
        <Button variant='blue' className='rounded-none w-full h-[16%] sm:h-[11%]'>
          선택하기
        </Button>
        <DescriptionText description={items[index * 2].description} />
      </div>
      <div
        onClick={() => onRightClick(items[index * 2 + 1].id)}
        className='w-full h-[50%] sm:w-[50%] sm:h-full absolute bottom-0 sm:right-0'
      >
        <div className='w-full h-[84%] sm:h-[89%]'>
          <Player url={items[index * 2 + 1].url} width='100%' height='100%' />
        </div>
        <Button variant='red' className='rounded-none w-full h-[16%] sm:h-[11%]'>
          선택하기
        </Button>
        <DescriptionText description={items[index * 2 + 1].description} />
      </div>
    </div>
  )
}
