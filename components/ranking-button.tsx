'use client'

import { Button } from '@/components/ui/button'
import { BarChart } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  cupID: string
}

export default function RankingButton({ cupID }: Props) {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push(`/cup/${cupID}/ranking`)}
      className='w-full mt-4 h-16 font-bold bg-primary text-primary-foreground/90'
    >
      <BarChart className='w-4 h-4 mr-1' />
      <span>랭킹보기</span>
    </Button>
  )
}
