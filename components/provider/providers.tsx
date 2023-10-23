import { Children } from '@/types/type'

import { NextThemesProvider } from '@/components/provider/theme-provider'
import ModalProvider from '@/components/provider/modal-provider'
import { ConfettiProvider } from '@/components/provider/confetti-provider'
import { Toaster } from '@/components/ui/toaster'

export default function Providers({ children }: Children) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem={false} storageKey='pingping'>
      <ModalProvider>
        <ConfettiProvider>
          {children}
          <Toaster />
        </ConfettiProvider>
      </ModalProvider>
    </NextThemesProvider>
  )
}
