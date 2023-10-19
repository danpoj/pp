'use client'

import type { Prisma } from '@prisma/client'
import { useState } from 'react'
import TournamentLanding from './tournament-landing'
import TournamentImage from './tournament-image'
import TournamentVideo from './tournament-video'

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
    <div className='h-full w-full'>
      {isLanding ? (
        <TournamentLanding cup={cup} cupLength={cupLength} setCupLength={setCupLength} setisLanding={setIsLanding} />
      ) : (
        <>
          {cup.type === 'IMAGE' && <TournamentImage cup={cup} cupLength={cupLength} />}
          {cup.type === 'VIDEO' && <TournamentVideo cup={cup} cupLength={cupLength} />}
        </>
      )}
    </div>
  )
}
