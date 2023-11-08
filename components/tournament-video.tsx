'use client'

import CupInformation from '@/components/cup-information'
import DescriptionText from '@/components/description-text'
import { Player } from '@/components/player'
import { Button } from '@/components/ui/button'
import { shuffle } from '@/lib/shuffle'
import { updateCupPlayCountAndItemWinCount } from '@/lib/update-cup-playcount-and-item-wincount'
import { cn } from '@/lib/utils'
import { CupLength } from '@/types/type'
import type { Cup, Item } from '@prisma/client'
import { motion as m } from 'framer-motion'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type Props = {
  cup: Cup & {
    items: Item[]
  }
  cupLength: CupLength
  isHidingHeader: boolean
}

export default function TournamentVideo({ cup, cupLength, isHidingHeader }: Props) {
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
    }, 1300)

    return () => clearTimeout(timeout)
  }, [index])

  const onClick = async ({ item, position }: { item: Item; position: 'LEFT' | 'RIGHT' }) => {
    setClicked(position)
    selectedItem.current = item

    if (limit.current === 1) {
      try {
        await updateCupPlayCountAndItemWinCount({
          cupId: cup.id,
          itemId: item.id,
        })
      } catch (error) {
        console.log('cup playcount / item wincount update failed', error)
      } finally {
        router.push(`/cup/${cup.id}/${item.id}`)
      }
    } else if (index + 1 >= limit.current) {
      selectedItems.current.push(item)
      limit.current /= 2
      setIndex(0)
      setItems(shuffle(selectedItems.current))
      selectedItems.current = []
    } else {
      selectedItems.current.push(item)
      setIndex((prev) => prev + 1)
    }
  }

  return (
    <div className='h-full flex items-center justify-center flex-col md:flex-row relative bg-black'>
      <CupInformation isHidingHeader={isHidingHeader} title={cup.title} limit={limit.current} index={index} />
      <Initial onClick={onClick} items={items} index={index} clicked={clicked} />

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
        duration: 0.3,
      }}
      className='w-full max-w-2xl aspect-video absolute left-0 rounded overflow-hidden'
    >
      <Image
        unoptimized
        src={selectedItem.videoThumbnail!}
        fill
        alt={selectedItem.description ?? '유튜브 토너먼트 컨텐츠'}
        className='object-cover'
      />
      <DescriptionText description={selectedItem.description} />
    </m.div>
  )
}

const Right = ({ selectedItem }: { selectedItem: Item }) => {
  return (
    <m.div
      animate={{ right: '50%', translateX: '50%' }}
      transition={{
        duration: 0.3,
      }}
      className='w-full max-w-2xl aspect-video absolute right-0 rounded overflow-hidden'
    >
      <Image
        unoptimized
        src={selectedItem.videoThumbnail!}
        fill
        alt={selectedItem.description ?? '유튜브 토너먼트 컨텐츠'}
        className='object-cover'
      />
      <DescriptionText description={selectedItem.description} />
    </m.div>
  )
}

const Initial = ({
  items,
  index,
  clicked,
  onClick,
}: {
  items: Item[]
  index: number
  clicked: 'LEFT' | 'RIGHT' | 'INITIAL'
  onClick: ({ item, position }: { item: Item; position: 'LEFT' | 'RIGHT' }) => void
}) => {
  const leftIndex = index * 2
  const rightIndex = index * 2 + 1

  return (
    <div className={cn('w-full h-full', clicked === 'INITIAL' ? 'opacity-100' : 'opacity-0')}>
      <div className='w-full h-[50%] sm:w-[50%] sm:h-full absolute top-0 sm:left-0'>
        <div className='w-full h-[88%] sm:h-[93%]'>
          <Player url={items[leftIndex].url} width='100%' height='100%' />
        </div>
        <Button
          onClick={() =>
            onClick({
              item: items[leftIndex],
              position: 'LEFT',
            })
          }
          variant='blue'
          className='rounded-none w-full h-[12%] sm:h-[7%]'
        >
          선택하기 <Check className='w-4 h-4 ml-1 stroke-[3px]' />
        </Button>
        <DescriptionText description={items[leftIndex].description} />
      </div>

      <div className='w-full h-[50%] sm:w-[50%] sm:h-full absolute bottom-0 sm:right-0'>
        <div className='w-full h-[88%] sm:h-[93%]'>
          <Player url={items[rightIndex].url} width='100%' height='100%' />
        </div>
        <Button
          onClick={() =>
            onClick({
              item: items[rightIndex],
              position: 'RIGHT',
            })
          }
          variant='red'
          className='rounded-none w-full h-[12%] sm:h-[7%] font-bold'
        >
          선택하기 <Check className='w-4 h-4 ml-1 stroke-[3px]' />
        </Button>
        <DescriptionText description={items[rightIndex].description} />
      </div>
    </div>
  )
}
