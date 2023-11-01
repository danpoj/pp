'use client'

import type { CupType, Item } from '@prisma/client'
import Image from 'next/image'
import CupItemDescriptionForm from './cup-item-description-form'
import Link from 'next/link'

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
          <Link
            href={`/cup/${item.cupId}/${item.id}`}
            target='_blank'
            rel='noreferrer noopener'
            className='hover:opacity-80 rounded overflow-hidden transition-opacity h-full'
          >
            <Image
              unoptimized
              src={item.url}
              alt={item.description || 'cup item'}
              width={300}
              height={260}
              // quality={40}
              className='object-contain w-full h-full'
            />
          </Link>
        ) : (
          <Link
            href={`/cup/${item.cupId}/${item.id}`}
            target='_blank'
            rel='noreferrer noopener'
            className='hover:opacity-80 rounded overflow-hidden transition-opacity h-full'
          >
            <Image
              unoptimized
              src={item.videoThumbnail!}
              alt={item.description || 'cup item'}
              width={item.width!}
              height={item.height!}
              className='object-contain w-full h-full'
            />
          </Link>
        )}
      </div>

      <CupItemDescriptionForm item={item} contentsLength={contentsLength} cupType={cupType} />
    </div>
  )
}
