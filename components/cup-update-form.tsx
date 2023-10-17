import { Cup, Item } from '@prisma/client'
import CupDescriptionForm from './cup-description-form'
import CupItemForm from './cup-item-form'
import CupTitleForm from './cup-title-form'
import { Separator } from './ui/separator'
import { Trash2 } from 'lucide-react'

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

export default function CupUpdateForm({ cup }: Props) {
  return (
    <div>
      <CupTitleForm title={cup.title} cupId={cup.id} />
      <CupDescriptionForm description={cup.description} cupId={cup.id} />

      <Separator className='my-2' />

      <p className='text-2xl mt-20 mb-4'>컨텐츠 설정 ({cup._count.items}개)</p>

      {cup._count.items <= 8 && (
        <p className='flex gap-1 items-center mb-4 text-red-500 font-bold'>
          <Trash2 className='w-4 h-4' /> 더 이상 삭제 할 수 없습니다 (최소 컨텐츠 개수 8개)
        </p>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4'>
        {cup.items.map((item) => (
          <CupItemForm key={item.id} item={item} cupType={cup.type} contentsLength={cup._count.items} />
        ))}
      </div>
    </div>
  )
}