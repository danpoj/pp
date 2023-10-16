'use client'

import { Cup, Item } from '@prisma/client'
import Image from 'next/image'
import CupTitleForm from './cup-title-form'
import CupDescriptionForm from './cup-description-form'
import { Separator } from './ui/separator'
import CupItemForm from './cup-item-form'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

type Props = {
  cup: Cup & {
    _count: {
      items: number
      comments: number
      likes: number
    }
    items: Item[]
  }
}

export default function ImageCupUpdateForm({ cup }: Props) {
  return (
    <div>
      <CupTitleForm title={cup.title} cupId={cup.id} />
      <CupDescriptionForm description={cup.description} cupId={cup.id} />

      <Separator className='my-2' />

      <p className='text-2xl mt-20'>컨텐츠 설정 ({cup._count.items}개)</p>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4'>
        {cup.items.map((item) => (
          <CupItemForm key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
