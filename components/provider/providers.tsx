import { Children } from '@/types/type'

import { NextThemesProvider } from '@/components/provider/theme-provider'
import ReactQueryProvider from '@/components/provider/react-query-provider'
import ModalProvider from '@/components/provider/modal-provider'
import { ConfettiProvider } from './confetti-provider'
import { Toaster } from '../ui/toaster'

export default function Providers({ children }: Children) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem={false} storageKey='pingping'>
      <ReactQueryProvider>
        <ModalProvider>
          <ConfettiProvider>
            {children}
            <Toaster />
          </ConfettiProvider>
        </ModalProvider>
      </ReactQueryProvider>
    </NextThemesProvider>
  )
}
