'use client'

import { Children } from '@/types/type'
import { Dispatch, SetStateAction, createContext, useContext, useRef, useState } from 'react'

type ModalType = 'signin' | 'signup' | 'create-complete' | null
type Data = {
  thumbnail: string
  title: string
  description: string
  cupId: string
  thumbnailWidth: number
  thumbnailHeight: number
}

type Modal = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  type: ModalType
  data?: Data | null
  open: (modalType: ModalType, data?: Data | null) => void
  close: () => void
}

const ModalContext = createContext<Modal | null>(null)

export default function ModalProvider({ children }: Children) {
  const [isOpen, setIsOpen] = useState(false)
  const type = useRef<ModalType>(null)
  const dataRef = useRef<Data | null>(null)

  const open = (modalType: ModalType, data: Data | null | undefined) => {
    setIsOpen(true)
    type.current = modalType
    if (data) {
      dataRef.current = { ...data }
    }
  }

  const close = () => {
    setIsOpen(false)
    type.current = null
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        type: type.current,
        data: dataRef.current,
        open,
        close,
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
