'use client'

import { cupData } from '@/app/(main)/create/page'
import { createPageImage1, createPageImage2, createPageImage3, createPageImage4 } from '@/data/images'
import { motion as m } from 'framer-motion'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { YoutbeIcon } from '../icons'

type Props = {
  setCurrentStep: Dispatch<SetStateAction<number>>
  cupData: MutableRefObject<cupData>
}

export default function Step1({ setCurrentStep, cupData }: Props) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className='mt-10 flex flex-col w-full items-center'
    >
      <p className='text-3xl font-extrabold text-primary/70 tracking-tight'>어떤 종류의 월드컵인가요? 👋</p>

      <div className='flex mt-6 md:mt-16 gap-5 flex-col md:flex-row w-full'>
        <Button
          onClick={() => {
            cupData.current.type = 'IMAGE'
            setCurrentStep((cs) => cs + 1)
          }}
          variant='ghost'
          className='flex flex-col gap-10 md:w-full h-[14rem] md:h-[20rem] group dark:brightness-75 dark:hover:brightness-90 transition'
        >
          <div className='grid grid-cols-4 md:grid-cols-2 gap-0.5 h-fit'>
            <Image
              src={createPageImage1}
              alt='create worldcup image'
              width={80}
              height={80}
              className='object-cover w-[80px] h-[80px] rounded'
            />
            <Image
              src={createPageImage2}
              alt='create worldcup image'
              width={80}
              height={80}
              className='object-cover w-[80px] h-[80px] rounded'
            />
            <Image
              src={createPageImage3}
              alt='create worldcup image'
              width={80}
              height={80}
              className='object-cover w-[80px] h-[80px] rounded'
            />
            <Image
              src={createPageImage4}
              alt='create worldcup image'
              width={80}
              height={80}
              className='object-cover w-[80px] h-[80px] rounded'
            />
          </div>
          <span className='text-2xl font-extrabold text-primary/90 tracking-tight'>이미지 월드컵</span>
        </Button>
        <Button
          onClick={() => {
            cupData.current.type = 'VIDEO'
            setCurrentStep((cs) => cs + 1)
          }}
          variant='ghost'
          className='flex flex-col gap-10 md:w-full h-[14rem] md:h-[20rem] group dark:brightness-75 dark:hover:brightness-90 transition'
        >
          <div className='flex items-center gap-2'>
            <YoutbeIcon className='w-24 md:w-40 h-fit' />
            <span className='font-mono text-2xl font-semibold md:text-4xl tracking-tight'>YouTube</span>
          </div>
          <span className='text-2xl font-extrabold text-primary/90 tracking-tight'>유튜브 영상 월드컵</span>
        </Button>
      </div>
    </m.div>
  )
}
