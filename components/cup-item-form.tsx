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
      <div className='w-44 h-44 relative shrink-0 flex items-center justify-center'>
        {cupType === 'IMAGE' ? (
          <CldImage
            src={item.url}
            alt={item.description || 'cup item'}
            width={item.width!}
            height={item.height!}
            className='object-contain w-full'
            quality={40}
          />
        ) : (
          <Image
            src={item.videoThumbnail!}
            alt={item.description || 'cup item'}
            width={item.width!}
            height={item.height!}
            className='object-contain w-full'
          />
        )}
      </div>

      <CupItemDescriptionForm item={item} contentsLength={contentsLength} cupType={cupType} />
    </div>
  )
}
