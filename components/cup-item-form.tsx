'use client'

import { CupType, Item } from '@prisma/client'
import Image from 'next/image'
import CupItemDescriptionForm from './cup-item-description-form'
import { CldImage } from 'next-cloudinary'

type Props = {
  item: Item
  cupType: CupType
  contentsLength: number
}

export default function CupItemForm({ item, cupType, contentsLength }: Props) {
  return (
    <div key={item.id} className='flex w-full gap-2 items-center'>
      <div className='w-44 h-44 relative shrink-0'>
        <CldImage
          src={cupType === 'IMAGE' ? item.url : item.videoThumbnail!}
          alt={item.description || 'cup item'}
          fill
          className='object-contain'
          quality={20}
        />
      </div>

      <CupItemDescriptionForm item={item} contentsLength={contentsLength} cupType={cupType} />
    </div>
  )
}
