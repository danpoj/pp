'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useModal } from '../provider/modal-provider'
import SignIn from '../sign-in'
import SignUp from '../sign-up'

export default function SignUpModal() {
  const { type, isOpen, close } = useModal()

  const isModalOpen = type === 'signup' && isOpen

  return (
    <Dialog open={isModalOpen} onOpenChange={close}>
      <DialogContent>
        <SignUp />
      </DialogContent>
    </Dialog>
  )
}
