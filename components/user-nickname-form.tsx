'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useConfetti } from '@/components/provider/confetti-provider'
import { toast } from 'sonner'

type Props = {
  user: User
}

const nicknameSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, { message: '닉네임을 입력해주세요' })
    .max(20, '닉네임은 20글자를 넘길 수 없습니다'),
})

export default function UserNicknameForm({ user }: Props) {
  const form = useForm<z.infer<typeof nicknameSchema>>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname: user.nickname!,
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { open: openConfetti } = useConfetti()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof nicknameSchema>) => {
    try {
      setIsSubmitting(true)

      const { data } = await axios.patch(`/api/user/nickname`, values)

      toast.success(`${data.nickname}로 변경되었습니다`)

      router.refresh()

      openConfetti()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-2'>
                    <span className='text-slate-600'>@</span>
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormDescription>20글자 이하의 닉네임을 설정해주세요</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button type='submit' disabled={isSubmitting} isLoading={isSubmitting} className='w-32'>
              닉네임 변경
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
