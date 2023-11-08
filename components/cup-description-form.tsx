'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { descriptionSchema } from '@/lib/validations'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  description: string
  cupId: string
}

export default function CupDescriptionForm({ description, cupId }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: description,
    },
  })

  const onSubmit = async (values: z.infer<typeof descriptionSchema>) => {
    try {
      setIsSubmitting(true)
      await axios.patch(`/api/cup/${cupId}/description`, values)

      toast.success('월드컵 설명 수정 완료!')
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 mb-10'>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Input placeholder='설명 입력...' {...field} />
              </FormControl>
              <FormDescription>월드컵 설명을 입력해주세요</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button type='submit' disabled={isSubmitting} isLoading={isSubmitting}>
            설명 수정하기
          </Button>
        </div>
      </form>
    </Form>
  )
}
