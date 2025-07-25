'use client'

import { QueryProvider } from '@/lib/components/query-provider'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>
}
