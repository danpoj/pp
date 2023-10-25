import Modals from '@/components/modal/modals'
import Providers from '@/components/provider/providers'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['500', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pingping.online'),
  title: {
    default: 'PingPing',
    template: 'PingPing',
  },
  description: 'PingPing 이상형 월드컵',
  openGraph: {
    title: 'PingPing',
    description: 'PingPing 이상형 월드컵',
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <Script
        async
        crossOrigin='anonymous'
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3412419424653583'
      />
      <body className={cn('antialiased text-sm', notoSans.className)}>
        <Providers>
          {children}
          <Modals />
        </Providers>
      </body>
    </html>
  )
}
