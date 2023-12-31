'use client'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ClipboardWithLink } from '../clipboard-with-link'
import { useModal } from '../provider/modal-provider'
import { Button } from '../ui/button'

export default function CreateCompleteModal() {
  const router = useRouter()
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
            <Image
              width={data?.thumbnailWidth}
              height={data?.thumbnailHeight}
              src={data?.thumbnail!}
              // quality={40}
              alt={data?.title!}
              className='object-contain w-full h-full'
            />
          </div>
          <div className='px-4 mt-2'>
            <p className='text-lg truncate text-primary/70'>{data?.title}</p>
            <p className='text-xs truncate text-primary/60 mt-2'>{data?.description}</p>
            <ClipboardWithLink path={`/cup/${data?.cupId}`} className='mt-4' />

            <Button
              onClick={() => {
                router.push(`/cup/${data?.cupId}/update`)
                close()
              }}
              className='mt-4 w-full'
            >
              월드컵 설정 하러가기 <ChevronRight className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
