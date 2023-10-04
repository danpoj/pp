'use client'

import CreateCompleteModal from './create-complete-modal'
import SignInModal from './sign-in-modal'
import SignUpModal from './sign-up-modal'

export default function Modals() {
  return (
    <>
      <SignInModal />
      <SignUpModal />
      <CreateCompleteModal />
    </>
  )
}
