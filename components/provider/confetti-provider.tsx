'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import ReactConfetti from 'react-confetti'

type ConfettiType = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ConfettiContext = createContext<ConfettiType | null>(null)

export const ConfettiProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <ConfettiContext.Provider
      value={{
        isOpen,
        open,
        close,
      }}
    >
      {isOpen && (
        <ReactConfetti
          className='pointer-events-none z-[100]'
          numberOfPieces={500}
          recycle={false}
          onConfettiComplete={close}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
      {children}
    </ConfettiContext.Provider>
  )
}

export const useConfetti = () => {
  const context = useContext(ConfettiContext)

  if (!context) throw new Error('useConfetti is used outside of <ConfettiProvider>.')

  return context
}
