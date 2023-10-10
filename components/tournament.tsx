'use client'

import type { Prisma } from '@prisma/client'
import { useState } from 'react'
import TournamentLanding from './tournament-landing'
import TournamentProgress from './tournament-progress'

type Props = {
  cup: Prisma.CupGetPayload<{
    include: {
      items: true
    }
  }>
}

export type CupLength = 8 | 16 | 32 | 64

export default function Tournament({ cup }: Props) {
  const [isLanding, setIsLanding] = useState(true)
  const [cupLength, setCupLength] = useState<CupLength>(8)

  return (
    <div className='h-full'>
      {isLanding ? (
        <TournamentLanding cup={cup} cupLength={cupLength} setCupLength={setCupLength} setisLanding={setIsLanding} />
      ) : (
        <TournamentProgress cup={cup} cupLength={cupLength} />
      )}
    </div>
  )
}
