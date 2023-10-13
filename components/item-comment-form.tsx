'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  itemId: string
}

const commentSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, { message: '댓글을 입력해주세요' })
    .max(1000, { message: '1000글자 이하의 댓글을 입력해주세요' }),
})

export default function ItemCommentForm({ itemId }: Props) {
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: '',
    },
  })
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    try {
      setIsSubmitting(true)

      await axios.post(`/api/item/${itemId}/comment`, values)

      router.refresh()
      form.reset()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4'>
          <FormField
            control={form.control}
            name='comment'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex h-12 gap-2'>
                    <Input placeholder='댓글 입력...' {...field} className='h-12' />
                    <Button type='submit' disabled={isSubmitting} isLoading={isSubmitting} className='h-full w-24'>
                      등록
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
