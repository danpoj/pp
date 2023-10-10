import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/provider/providers'
import Modals from '@/components/modal/modals'

const inter = Inter({ subsets: ['latin'], weight: ['500', '700', '900'] })

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
      <body className={cn('antialiased text-sm font-semibold', inter.className)}>
        <Providers>
          {children}
          <Modals />
        </Providers>
      </body>
    </html>
  )
}
