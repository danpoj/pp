import Modals from '@/components/modal/modals'
import Providers from '@/components/provider/providers'
import { cn } from '@/lib/utils'
import { Noto_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import GoogleAnalytics from '@/components/analytics/google-analytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pingping.online'),
  title: 'PingPing 이상형 월드컵',
  keywords: ['이상형 월드컵', '이상형', '월드컵', '핑핑', 'pingping'],
  description: '핑핑은 나만의 이상형 월드컵을 만들고 사용자들과 공유하는 공간이에요',
  openGraph: {
    title: 'PingPing 이상형 월드컵',
    description: '핑핑은 나만의 이상형 월드컵을 만들고 사용자들과 공유하는 공간이에요',
    url: 'https://www.pingping.online',
    siteName: 'PingPing',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    title: 'Ping Ping',
    card: 'summary_large_image',
  },
  verification: {
    google: 'Ve2EPtkFbD5bFsAaOqCqAuyELbzmLPZqspd_G6y6nEk',
  },
}

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['500'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <Script
        async
        crossOrigin='anonymous'
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3412419424653583'
        strategy='lazyOnload'
      />

      <body className={cn('antialiased text-sm', notoSans.className)}>
        <Providers>
          {children}
          <Modals />
        </Providers>

        <GoogleAnalytics />
      </body>
    </html>
  )
}
