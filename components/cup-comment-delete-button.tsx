'use client'

import axios from 'axios'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  cupId: string
  commentId: string
}

export default function CupCommentDeleteButton({ cupId, commentId }: Props) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const router = useRouter()

  const onDeleteCupComment = async () => {
    try {
      setIsDeleting(true)

      await axios.delete(`/api/cup/${cupId}/comment/${commentId}`)

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
      className='w-5 h-5 rounded-sm ml-2'
      variant='destructive'
    >
      <Trash2 className='w-3 h-3' />
    </Button>
  )
}
