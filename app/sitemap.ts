import db from '@/lib/db'

export default async function sitemap() {
  const cupIds = await db.cup.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  })

  const cups = cupIds.map((cup) => ({
    url: `https://www.pingping.online/cup/${cup.id}`,
    lastModified: cup.updatedAt,
  }))

  const routes = [''].map((route) => ({
    url: `https://www.pingping.online${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'always',
    priority: 1,
  }))

  return [...routes, ...cups]
}
