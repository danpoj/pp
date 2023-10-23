'use client'

import { cn } from '@/lib/utils'
import type { CupType, Item, Prisma } from '@prisma/client'
import { Check, ChevronDown, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { CupLength } from './tournament'
import { Button } from './ui/button'
import { CldImage } from 'next-cloudinary'

type Props = {
  cup: Prisma.CupGetPayload<{
    include: {
      items: true
    }
  }>
  cupLength: CupLength
  setCupLength: Dispatch<SetStateAction<CupLength>>
  setisLanding: Dispatch<SetStateAction<boolean>>
}

export default function TournamentLanding({ cup, cupLength, setCupLength, setisLanding }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const increaseIndex = () => {
      setCurrentIndex((i) => (i + 1) % 4)
    }

    const intervalId = setInterval(increaseIndex, 4000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='h-full flex items-center justify-center relative w-full'>
      <ImageRotation images={cup.items.slice(0, 3)} currentIndex={currentIndex} type={cup.type} />

      <Modal
        cupLength={cupLength}
        setCupLength={setCupLength}
        setisLanding={setisLanding}
        cupItemsLength={cup.items.length}
      />
    </div>
  )
}

function ImageRotation({ currentIndex, images, type }: { images: Item[]; currentIndex: number; type: CupType }) {
  return (
    <div className='w-full h-full rounded overflow-hidden absolute'>
      {images.map((item, index) => (
        <Fragment key={item.id}>
          {type === 'IMAGE' ? (
            <CldImage
              width={600}
              height={520}
              src={item.publicId!}
              alt='cup landing background image'
              quality={40}
              className={cn(
                'w-full h-full object-cover absolute inset-0 transition-all duration-300',
                currentIndex === index ? 'opacity-100 transform-none' : 'opacity-0'
              )}
            />
          ) : (
            <Image
              fill
              src={item.videoThumbnail!}
              alt='cup landing background image'
              className={cn(
                'w-full h-full object-cover absolute inset-0 transition-all duration-300',
                currentIndex === index ? 'opacity-100 transform-none' : 'opacity-0'
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}

type ModalProps = {
  cupLength: CupLength
  setCupLength: Dispatch<SetStateAction<CupLength>>
  setisLanding: Dispatch<SetStateAction<boolean>>
  cupItemsLength: number
}

function Modal({ cupLength, setCupLength, setisLanding, cupItemsLength }: ModalProps) {
  const cupItemsIndex = cupItemsLength >= 64 ? 4 : cupItemsLength >= 32 ? 3 : cupItemsLength >= 16 ? 2 : 1
  const cupLengthArray = Array.from({ length: cupItemsIndex }, (_, index) => 2 ** (index + 3)) as unknown as CupLength[]

  return (
    <div className='relative w-full h-full flex items-center justify-center'>
      <div aria-hidden className='bg-black inset-0 absolute opacity-60' />
      <div className='bg-background rounded-lg w-full max-w-[32rem] z-50 p-6 absolute flex flex-col gap-6 items-center'>
        <div className='mb-4 flex flex-col items-center gap-2'>
          <span className='text-xl'>총 {cupItemsLength}개의 컨텐츠</span>
          <span className='flex items-center'>
            컨텐츠 개수를 선택해주세요 <ChevronDown />
          </span>
        </div>

        <div className='flex flex-col w-full gap-1'>
          {cupLengthArray.map((length) => (
            <Button
              onClick={() => setCupLength(length)}
              variant={cupLength === length ? 'default' : 'ghost'}
              key={length}
              className='h-14'
            >
              {length}강 {cupLength === length && <Check className='w-4 h-4 ml-2' />}
            </Button>
          ))}
        </div>

        <Button onClick={() => setisLanding(false)} size='lg' variant='blue' className='w-full h-14'>
          월드컵 시작하기 <ChevronRight className='w-5 h-5 ml-1' />
        </Button>
      </div>
    </div>
  )
}
