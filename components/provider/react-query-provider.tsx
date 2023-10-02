'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const client = new QueryClient()

type Props = {
  children: ReactNode
}

export default function ReactQueryProvider({ children }: Props) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
