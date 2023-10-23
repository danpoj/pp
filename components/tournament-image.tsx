'use client'

import { shuffle } from '@/lib/shuffle'
import { updateCupPlayCountAndItemWinCount } from '@/lib/update-cup-playcount-and-item-wincount'
import { cn } from '@/lib/utils'
import type { Item, Prisma } from '@prisma/client'
import { motion as m } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import DescriptionText from '@/components/description-text'
import type { CupLength } from '@/components/tournament'

type Props = {
  cup: Prisma.CupGetPayload<{
    include: {
      items: true
    }
  }>
  cupLength: CupLength
}

export default function TournamentImage({ cup, cupLength }: Props) {
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
    <div className='h-full flex items-center justify-center flex-col md:flex-row relative bg-black w-full'>
      <div className='bg-black/70 w-full h-14 fixed top-0 z-50 mt-12 text-white flex gap-3 items-center justify-center pointer-events-none'>
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
      className='w-[70%] sm:w-[60%] h-full absolute left-0'
    >
      <div className='w-full h-full relative'>
        <CldImage
          className='absolute inset-0 object-contain w-full h-full'
          width={600}
          height={520}
          quality={40}
          src={selectedItem.url!}
          alt={selectedItem.description || 'tournament left image'}
        />
      </div>
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
      className='w-[70%] sm:w-[60%] h-full absolute right-0'
    >
      <div className='w-full h-full relative'>
        <CldImage
          className='absolute inset-0 object-contain w-full h-full'
          width={600}
          height={520}
          quality={40}
          src={selectedItem.url!}
          alt={selectedItem.description || 'tournament left image'}
        />
      </div>
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
      <button
        onClick={() => onLeftClick(items[index * 2].id)}
        className='w-full h-1/2 top-0 sm:w-[50%] sm:h-full sm:left-0 absolute'
      >
        <div className='w-full h-full relative'>
          <CldImage
            className='absolute inset-0 object-contain w-full h-full'
            width={600}
            height={520}
            quality={40}
            src={items[index * 2].url}
            alt={items[index * 2].description || 'tournament left image'}
          />
        </div>
        <DescriptionText description={items[index * 2].description} />
      </button>
      <button
        onClick={() => onRightClick(items[index * 2 + 1].id)}
        className='w-full h-1/2 bottom-0 sm:w-[50%] sm:h-full sm:right-0 absolute'
      >
        <div className='w-full h-full relative'>
          <CldImage
            className='absolute inset-0 object-contain w-full h-full'
            width={600}
            height={520}
            quality={40}
            src={items[index * 2 + 1].url}
            alt={items[index * 2 + 1].description || 'tournament left image'}
          />
        </div>
        <DescriptionText description={items[index * 2 + 1].description} />
      </button>
    </div>
  )
}
