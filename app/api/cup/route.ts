import { getSession } from '@/lib/auth'
import db from '@/lib/db'
import { getQuery } from '@/lib/get-query'
import { NextRequest, NextResponse } from 'next/server'

type Type = 'all' | 'video' | 'image'

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url)
    const isLiked = url.searchParams.get('isLiked') === 'true' || false

    let type = url.searchParams.get('type') as Type | undefined
    let page = url.searchParams.get('page')

    if (!(type === 'all' || type === 'video' || type === 'image' || type == null)) type = 'all'

    const query = getQuery({
      page: +page!,
      type,
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
