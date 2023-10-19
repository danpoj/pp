import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/my/*', '/setting', '/create', '/cup/*/update'],
      },
    ],
    sitemap: 'https://pingping.online/sitemap.xml',
    host: 'https://pingping.online',
  }
}
