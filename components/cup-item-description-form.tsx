'use client'

import { itemDescriptionSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Item } from '@prisma/client'

type Props = {
  item: Item
}

export default function CupItemDescriptionForm({ item }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof itemDescriptionSchema>>({
    resolver: zodResolver(itemDescriptionSchema),
    defaultValues: {
      description: item.description ?? '',
    },
  })

  const onSubmit = async (values: z.infer<typeof itemDescriptionSchema>) => {
    try {
      setIsSubmitting(true)

      await axios.patch(`/api/item/${item.id}`, values)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='w-full space-y-2'>
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
                    <Input {...field} className='rounded h-9' />
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                      className='shrink-0 rounded px-3 text-xs h-9'
                    >
                      수정 <Pencil className='w-3 h-3 ml-1' />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <CupItemDeleteButton itemId={item.id} />
    </div>
  )
}

function CupItemDeleteButton({ itemId }: { itemId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const onDelete = async () => {
    try {
      setIsDeleting(true)

      await axios.delete(`/api/item/${itemId}`)

      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      onClick={() => onDelete()}
      disabled={isDeleting}
      isLoading={isDeleting}
      size='sm'
      variant='destructive'
      className='rounded px-1.5 text-xs text-[11px] h-7'
    >
      삭제 <Trash2 className='w-3 h-3 ml-1' />
    </Button>
  )
}
