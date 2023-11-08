'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  itemId: string
  commentId: string
}

export default function CupCommentDeleteButton({ itemId, commentId }: Props) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const router = useRouter()

  const onDeleteCupComment = async () => {
    try {
      setIsDeleting(true)

      await axios.delete(`/api/item/${itemId}/comment/${commentId}`)

      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      disabled={isDeleting}
      onClick={() => onDeleteCupComment()}
      size='icon'
      className='w-5 h-5 rounded ml-2 flex items-center justify-center'
      variant='secondary'
    >
      <Plus className='w-3.5 h-3.5 rotate-45 stroke-[3px]' />
    </Button>
  )
}
