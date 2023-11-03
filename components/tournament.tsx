'use client'

import TournamentImage from '@/components/tournament-image'
import TournamentLanding from '@/components/tournament-landing'
import TournamentVideo from '@/components/tournament-video'
import { cn } from '@/lib/utils'
import { CupLength } from '@/types/type'
import type { Cup, Item } from '@prisma/client'
import { useState } from 'react'
import ToggleHeaderButton from './toggle-header-button'

type Props = {
  cup: Cup & {
    items: Item[]
  }
}

export default function Tournament({ cup }: Props) {
  const [isLanding, setIsLanding] = useState(true)
  const [cupLength, setCupLength] = useState<CupLength>(8)

  const [isHidingHeader, setIsHidingHeader] = useState(true)

  const toggleHidingHeader = () => setIsHidingHeader((prev) => !prev)

  return (
    <section className={cn(isHidingHeader ? 'h-screen fixed inset-0 z-50' : 'h-full')}>
      <div className='h-full max-h-full w-full'>
        {isLanding ? (
          <TournamentLanding cup={cup} cupLength={cupLength} setCupLength={setCupLength} setisLanding={setIsLanding} />
        ) : (
          <>
            {cup.type === 'IMAGE' && (
              <TournamentImage isHidingHeader={isHidingHeader} cup={cup} cupLength={cupLength} />
            )}
            {cup.type === 'VIDEO' && (
              <TournamentVideo isHidingHeader={isHidingHeader} cup={cup} cupLength={cupLength} />
            )}
          </>
        )}
      </div>

      <ToggleHeaderButton isHidingHeader={isHidingHeader} toggleHidingHeader={toggleHidingHeader} />
    </section>
  )
}
