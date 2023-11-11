import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/my/*', '/setting', '/create'],
      },
    ],
    sitemap: 'https://www.pingping.online/sitemap.xml',
    host: 'https://www.pingping.online',
  }
}
