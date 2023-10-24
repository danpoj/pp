import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

type PatchProps = {
  params: {
    cupId: string
  }
}

export const PATCH = async (req: NextRequest, { params: { cupId } }: PatchProps) => {
  try {
    const session = await getSession()

    if (!session) return new NextResponse('Unauthorized', { status: 401 })

    const { thumbnail } = await req.json()

    await db.cup.update({
      where: {
        id: cupId,
      },
      data: {
        thumbnail,
      },
    })

    return NextResponse.json('ok')
  } catch (error) {
    return new NextResponse('/api/cup/[cupId]/playcount : cup playcount increasing failed.', { status: 500 })
  }
}
