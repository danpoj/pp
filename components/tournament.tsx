'use client'

import TournamentImage from '@/components/tournament-image'
import TournamentLanding from '@/components/tournament-landing'
import TournamentVideo from '@/components/tournament-video'
import { CupLength } from '@/types/type'
import type { Cup, Item } from '@prisma/client'
import { useState } from 'react'

type Props = {
  cup: Cup & {
    items: Item[]
  }
}

export default function Tournament({ cup }: Props) {
  const [isLanding, setIsLanding] = useState(true)
  const [cupLength, setCupLength] = useState<CupLength>(8)

  return (
    <div className='h-full max-h-full w-full'>
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
