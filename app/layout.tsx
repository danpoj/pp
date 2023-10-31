import Modals from '@/components/modal/modals'
import Providers from '@/components/provider/providers'
import { cn } from '@/lib/utils'
import { GeistSans } from 'geist/font'
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pingping.online'),
  title: {
    default: 'PingPing 이상형 월드컵',
    template: 'PingPing | %s',
  },
  keywords: ['이상형 월드컵', '이상형', '월드컵'],
  description: '핑핑은 나만의 이상형 월드컵을 만들고 사용자들과 공유하는 공간이에요',
  openGraph: {
    title: 'PingPing 이상형 월드컵',
    description: '핑핑은 나만의 이상형 월드컵을 만들고 사용자들과 공유하는 공간이에요',
    url: 'https://www.pingping.online',
    siteName: 'PingPing',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Ping Ping',
    card: 'summary_large_image',
  },
  verification: {
    google: 'Ve2EPtkFbD5bFsAaOqCqAuyELbzmLPZqspd_G6y6nEk',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head>
        <Script
          async
          crossOrigin='anonymous'
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3412419424653583'
          strategy='lazyOnload'
        />
      </head>
      <body className={cn('antialiased text-sm', GeistSans.className)}>
        <Providers>
          {children}
          <Modals />
        </Providers>
      </body>
    </html>
  )
}
