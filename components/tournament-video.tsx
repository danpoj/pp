'use client'

import { shuffle } from '@/lib/shuffle'
import { updateCupPlayCountAndItemWinCount } from '@/lib/update-cup-playcount-and-item-wincount'
import { cn } from '@/lib/utils'
import type { Item, Prisma } from '@prisma/client'
import { motion as m } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import DescriptionText from '@/components/description-text'
import { Player } from '@/components/player'
import type { CupLength } from '@/components/tournament'
import { Button } from '@/components/ui/button'
import CupInformation from '@/components/cup-information'
import Image from 'next/image'

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
  const [isFinished, setIsFinished] = useState(false)

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
      setIsFinished(true)
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
      setIsFinished(true)
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
      <CupInformation title={cup.title} limit={limit.current} index={index} />
      <Initial onLeftClick={onLeftClick} onRightClick={onRightClick} items={items} index={index} clicked={clicked} />

      {clicked === 'LEFT' && <Left selectedItem={selectedItem.current!} />}
      {clicked === 'RIGHT' && <Right selectedItem={selectedItem.current!} />}

      <Overlay isFinished={isFinished} />
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

const Overlay = ({ isFinished }: { isFinished: boolean }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center pointer-events-none'>
      {isFinished ? (
        <div className='flex flex-col gap-2 bg-primary p-4 rounded-lg items-center'>
          <span className='text-white'>결과 페이지로 이동 중...</span>
          <Image src='/loader.gif' width={80} height={80} alt='tournament finish loading state image' />
        </div>
      ) : (
        <div className='rounded-lg hidden md:block'>
          <p className='uppercase text-2xl font-black font-mono text-white'>
            <span className='text-blue-400'>V</span>
            <span className='text-red-400'>S</span>
          </p>
        </div>
      )}
    </div>
  )
}
