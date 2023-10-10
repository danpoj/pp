'use client'

import type { Item, Prisma } from '@prisma/client'
import { CupLength } from './tournament'

import { shuffle } from '@/lib/shuffle'
import { CldImage } from 'next-cloudinary'
import { useEffect, useRef, useState } from 'react'

import { motion as m, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = {
  cup: Prisma.CupGetPayload<{
    include: {
      items: true
    }
  }>
  cupLength: CupLength
}

export default function TournamentProgress({ cup, cupLength }: Props) {
  const [items, setItems] = useState(() => shuffle(cup.items).slice(0, cupLength))
  const [index, setIndex] = useState(0)
  const selectedItems = useRef<Item[]>([])
  const limit = useRef<number>(cupLength / 2)
  const router = useRouter()
  const [clicked, setClicked] = useState<'LEFT' | 'RIGHT' | 'INITIAL'>('INITIAL')
  const selectedItem = useRef<Item | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClicked('INITIAL')
    }, 1600)

    return () => clearTimeout(timeout)
  }, [index])

  const onLeftClick = () => {
    setClicked('LEFT')
    selectedItem.current = items[index * 2]

    if (limit.current === 1) {
      router.push(`/cup/${cup.id}/${items[index * 2].id}`)
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

  const onRightClick = () => {
    setClicked('RIGHT')
    selectedItem.current = items[index * 2 + 1]

    if (limit.current === 1) {
      router.push(`/cup/${cup.id}/${items[index * 2 + 1].id}`)
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

      {clicked === 'LEFT' && <Left selectedItem={selectedItem.current!} />}

      {clicked === 'RIGHT' && <Right selectedItem={selectedItem.current!} />}

      <Initial onLeftClick={onLeftClick} onRightClick={onRightClick} items={items} index={index} clicked={clicked} />
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
      className='flex-1 w-[50%] h-full absolute left-0'
    >
      <div className='w-full h-full relative'>
        <CldImage
          className='absolute inset-0 object-contain'
          fill
          src={selectedItem?.publicId!}
          alt={selectedItem?.description || 'tournament left image'}
          quality={30}
          sizes='50vw'
        />
      </div>
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
      className='flex-1 w-[50%] h-full absolute right-0'
    >
      <div className='w-full h-full relative'>
        <CldImage
          className='absolute inset-0 object-contain'
          fill
          src={selectedItem?.publicId!}
          alt={selectedItem?.description || 'tournament left image'}
          quality={30}
          sizes='50vw'
        />
      </div>
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
  onLeftClick: () => void
  onRightClick: () => void
  items: Item[]
  index: number
  clicked: 'LEFT' | 'RIGHT' | 'INITIAL'
}) => {
  return (
    <div className={cn('w-full h-full', clicked === 'INITIAL' ? 'opacity-100' : 'opacity-0')}>
      <m.button onClick={onLeftClick} className='flex-1 w-[50%] h-full absolute left-0'>
        <div className='w-full h-full relative'>
          <CldImage
            className='absolute inset-0 object-contain'
            fill
            src={items[index * 2].publicId!}
            alt={items[index * 2].description || 'tournament left image'}
            quality={30}
            sizes='50vw'
          />
        </div>
      </m.button>
      <m.button onClick={onRightClick} className='flex-1 w-[50%] h-full absolute right-0'>
        <div className='w-full h-full relative'>
          <CldImage
            className='absolute inset-0 object-contain'
            fill
            src={items[index * 2 + 1].publicId!}
            alt={items[index * 2 + 1].description || 'tournament left image'}
            quality={30}
            sizes='50vw'
          />
        </div>
      </m.button>
    </div>
  )
}
