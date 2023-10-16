import { Item } from '@prisma/client'
import Image from 'next/image'
import CupItemDescriptionForm from './cup-item-description-form'

type Props = {
  item: Item
}

export default function CupItemForm({ item }: Props) {
  return (
    <div key={item.id} className='flex w-full gap-2 items-center'>
      <div className='w-44 h-44 relative shrink-0'>
        <Image src={item.url} alt={item.description || 'cup item'} fill className='object-contain' />
      </div>

      <CupItemDescriptionForm item={item} />
    </div>
  )
}
