'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useModal } from '../provider/modal-provider'
import SignIn from '../sign-in'

export default function SignInModal() {
  const { type, isOpen, onClose } = useModal()

  const isModalOpen = type === 'signin' && isOpen

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <SignIn />
      </DialogContent>
    </Dialog>
  )
}
