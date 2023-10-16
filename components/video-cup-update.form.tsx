'use client'

import { Cup, Item } from '@prisma/client'

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

export default function VideoCupUpdateForm({ cup }: Props) {
  return (
    <div>
      {cup.items.map((item) => (
        <div key={item.id}></div>
      ))}
    </div>
  )
}
