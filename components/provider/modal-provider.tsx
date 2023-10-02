'use client'

import { Children } from '@/types/type'
import { Dispatch, SetStateAction, createContext, useContext, useRef, useState } from 'react'

type ModalType = 'signin' | 'signup' | null

type Modal = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  type: ModalType
  onOpen: (modalType: ModalType) => void
  onClose: () => void
}

const ModalContext = createContext<Modal | null>(null)

export default function ModalProvider({ children }: Children) {
  const [isOpen, setIsOpen] = useState(false)
  const type = useRef<ModalType>(null)

  const onOpen = (modalType: ModalType) => {
    setIsOpen(true)
    type.current = modalType
  }

  const onClose = () => {
    setIsOpen(false)
    type.current = null
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        type: type.current,
        onOpen,
        onClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)

  if (!context) throw new Error('useModal is used outside of <ModalProvider>.')

  return context
}
