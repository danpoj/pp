import db from '@/lib/db'

export default async function sitemap() {
  const cupIds = await db.cup.findMany({
    select: {
      id: true,
      items: {
        select: {
          id: true,
        },
      },
      updatedAt: true,
    },
  })

  const cups = cupIds.map((cup) => ({
    url: `https://www.pingping.online/cup/${cup.id}`,
    priority: 1,
    lastModified: cup.updatedAt,
  }))

  const cupRankings = cupIds.map((cup) => ({
    url: `https://www.pingping.online/cup/${cup.id}/ranking`,
    priority: 1,
    lastModified: cup.updatedAt,
  }))

  const items = []

  for (const cup of cupIds) {
    for (const item of cup.items) {
      items.push({
        url: `https://www.pingping.online/cup/${cup.id}/${item.id}`,
        priority: 1,
        lastModified: cup.updatedAt,
      })
    }
  }

  const routes = [''].map((route) => ({
    url: `https://www.pingping.online${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'always',
    priority: 1,
  }))

  return [...routes, ...cups, ...cupRankings, ...items]
}
