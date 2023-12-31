'use client'

import { itemDescriptionSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Loader2, Pencil, Sparkle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CupType, Item } from '@prisma/client'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type Props = {
  item: Item
  contentsLength: number
  cupType: CupType
  thumbnail: string
}

export default function CupItemDescriptionForm({ item, contentsLength, cupType, thumbnail }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof itemDescriptionSchema>>({
    resolver: zodResolver(itemDescriptionSchema),
    defaultValues: {
      description: item.description ?? '',
    },
  })

  const onSubmit = async (values: z.infer<typeof itemDescriptionSchema>) => {
    if (values.description === item.description) {
      toast.info('기존 설명과 동일합니다.')

      return
    }

    try {
      setIsSubmitting(true)

      await axios.patch(`/api/item/${item.id}`, values)

      toast.success('설명 수정 완료!')

      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const itemThumbnail = cupType === 'IMAGE' ? item.url : item.videoThumbnail!
  const isThumbnail = itemThumbnail === thumbnail

  return (
    <div className='w-full space-y-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 w-full'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>설명</FormLabel>
                <FormControl>
                  <div className='flex gap-2'>
                    <Input {...field} className='rounded h-8' />
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='shrink-0 rounded px-3 text-xs text-[11px] h-8'
                    >
                      수정
                      {isSubmitting ? (
                        <Loader2 className='w-3 h-3 ml-1 animate-spin' />
                      ) : (
                        <Pencil className='w-3 h-3 ml-1' />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className={cn('flex', isThumbnail ? 'justify-end' : 'justify-between')}>
        {!isThumbnail && <CupThumbnailButton cupId={item.cupId} itemThumbnail={itemThumbnail} cupType={cupType} />}
        <CupItemDeleteButton
          isThumbnail={isThumbnail}
          itemId={item.id}
          contentsLength={contentsLength}
          cupType={cupType}
        />
      </div>
    </div>
  )
}

function CupThumbnailButton({
  cupId,
  itemThumbnail,
  cupType,
}: {
  cupId: string
  itemThumbnail: string
  cupType: CupType
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const onThumbnailChange = async () => {
    try {
      setIsSubmitting(true)

      await axios.patch(`/api/cup/${cupId}/thumbnail`, {
        thumbnail: itemThumbnail,
      })

      router.refresh()

      toast.success('썸네일 변경 완료!')
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      onClick={() => onThumbnailChange()}
      disabled={isSubmitting}
      size='sm'
      className='rounded text-xs text-[11px] h-8 bg-fancy hover:opacity-90 text-white'
    >
      썸네일 지정 <Sparkle className='w-3 h-3 ml-1' />
    </Button>
  )
}

function CupItemDeleteButton({
  itemId,
  contentsLength,
  cupType,
  isThumbnail,
}: {
  itemId: string
  contentsLength: number
  cupType: CupType
  isThumbnail: boolean
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const onDelete = async () => {
    if (contentsLength <= 8) return

    if (isThumbnail) {
      toast.info('썸네일로 지정된 이미지는 삭제 할 수 없습니다.')

      return
    }

    try {
      setIsDeleting(true)

      await axios.post(`/api/item/${itemId}`, {
        cupType,
      })

      router.refresh()

      toast.success('컨텐츠 삭제 완료!')
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      onClick={() => onDelete()}
      disabled={isDeleting || contentsLength <= 8}
      size='sm'
      variant='destructive'
      className='rounded text-xs text-[11px] h-8'
    >
      삭제 <Trash2 className='w-3 h-3 ml-1' />
    </Button>
  )
}
