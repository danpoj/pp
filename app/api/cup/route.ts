import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { getQuery } from '@/lib/get-query'
import { NextRequest, NextResponse } from 'next/server'

type Type = 'all' | 'video' | 'image'
type Order = 'popular' | 'like' | 'newest'

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url)
    const lastCupId = url.searchParams.get('lastCupId') as string | undefined
    const isLiked = url.searchParams.get('isLiked') === 'true' || false
    let type = url.searchParams.get('type') as Type | undefined
    let order = url.searchParams.get('order') as Order | undefined

    if (!(type === 'all' || type === 'video' || type === 'image' || type == null)) type = 'all'
    if (!(order === 'popular' || order === 'like' || order === 'newest' || order == null)) order = 'popular'

    const query = getQuery({
      lastCupId,
      type,
      order,
    })

    if (isLiked) {
      const session = await getSession()

      if (!session) return new NextResponse('Unauthorized', { status: 401 })

      const cups = await db.cup.findMany({
        ...query,

        where: {
          likes: {
            some: {
              userId: session.user.id,
            },
          },
        },
      })

      return NextResponse.json(cups)
    }

    const cups = await db.cup.findMany(query)

    return NextResponse.json(cups)
  } catch (error) {
    return new NextResponse('/api/cup : server error', { status: 500 })
  }
}
