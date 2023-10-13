import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export const PATCH = async (req: NextRequest) => {
  const session = await getSession()

  if (!session) return new NextResponse('/api/cup/[cupId]/like : 인증되지 않은 유저입니다', { status: 401 })

  db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      //   likedCups: {},
    },
  })
}
