import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pingping.online'),
  title: {
    default: 'PingPing',
    template: 'PingPing',
  },
  description: 'PingPing | 이상형 월드컵',
  openGraph: {
    title: 'Ping Ping',
    description: 'Ping Ping | 이상형 월드컵',
    url: 'https://www.pingping.online',
    siteName: 'Lee Robinson',
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
    <html lang='ko'>
      <body className={cn('antialiased', poppins.className)}>{children}</body>
    </html>
  )
}
