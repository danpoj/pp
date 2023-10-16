import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

type PatchProps = {
  params: {
    cupId: string
  }
}

export const PATCH = async (req: NextRequest, { params: { cupId } }: PatchProps) => {
  try {
    await db.cup.update({
      where: {
        id: cupId,
      },
      data: {
        playCount: {
          increment: 1,
        },
      },
    })

    return NextResponse.json('ok')
  } catch (error) {
    return new NextResponse('/api/cup/[cupId]/playcount : cup playcount increasing failed.', { status: 500 })
  }
}
