'use client'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useModal } from '../provider/modal-provider'
import Image from 'next/image'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ClipboardWithLink } from '../clipboard-with-link'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'

export default function CreateCompleteModal() {
  const { type, isOpen, close, data } = useModal()

  const isModalOpen = type === 'create-complete' && isOpen

  return (
    <Dialog open={isModalOpen} onOpenChange={close}>
      <DialogContent className='flex flex-col tracking-tighter'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl'>업로드 완료 🎊</DialogTitle>
        </DialogHeader>
        <div className=''>
          <div className='relative h-60 mx-auto rounded overflow-hidden'>
            <Image fill src={data?.thumbnail!} alt={data?.title!} className='object-contain' />
          </div>
          <div className='px-4 mt-2'>
            <p className='text-lg truncate text-primary/70'>{data?.title}</p>
            <p className='text-xs truncate text-primary/60 mt-2'>{data?.description}</p>
            <ClipboardWithLink path={`/cup/${data?.cupId}`} className='mt-4' />

            <Button className='mt-4 w-full'>
              월드컵 설정 하러가기 <ChevronRight className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
