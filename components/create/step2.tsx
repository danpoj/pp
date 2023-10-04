'use client'

import { cupData } from '@/app/(main)/create/page'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { motion as m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ChevronRight } from 'lucide-react'

type Props = {
  setCurrentStep: Dispatch<SetStateAction<number>>
  cupData: MutableRefObject<cupData>
}

const formSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요' }).max(50, {
    message: '제목은 50글자를 넘길 수 없습니다',
  }),
  description: z.string().min(1, { message: '설명을 입력해주세요' }).max(400, {
    message: '설명은 400글자를 넘길 수 없습니다',
  }),
})

export default function Step2({ setCurrentStep, cupData }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: cupData.current.title,
      description: cupData.current.description,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    cupData.current.title = values.title
    cupData.current.description = values.description
    setCurrentStep((cs) => cs + 1)
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className='mt-10 w-full flex flex-col items-center'
    >
      <p className='text-3xl font-extrabold text-primary/70 tracking-tight'>제목 및 설명을 작성해주세요</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-xl w-full space-y-6 mt-12 dark:brightness-75'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='font-bold mb-1 text-xl'>월드컵 제목</FormLabel>
                <FormControl>
                  <Input className='h-12' placeholder='e.g. 아이유노래 이상형 월드컵...' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='font-bold mb-1 text-xl'>월드컵 설명</FormLabel>
                <FormControl>
                  <Input
                    className='h-12'
                    placeholder='e.g. 아이유 뮤직비디오 동영상이 재생됩니다! 아이유 노래 64강...'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button variant='blue' className='h-12 w-40 font-extrabold' type='submit'>
              다음 단계
              <ChevronRight className='w-4 h-4 ml-1' />
            </Button>
          </div>
        </form>
      </Form>
    </m.div>
  )
}
