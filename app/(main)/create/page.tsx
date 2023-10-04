'use client'

import { CupType } from '@prisma/client'
import { useRef, useState } from 'react'
import Step1 from '@/components/create/step1'
import Step2 from '@/components/create/step2'
import Step3 from '@/components/create/step3'
import StepIcon from '@/components/create/step-icon'

export type cupData = {
  type: CupType
  title: string
  description: string
}

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1)
  const cupData = useRef<cupData>({
    type: 'IMAGE',
    title: '',
    description: '',
  })

  return (
    <div className='h-full w-full sm:max-w-6xl mx-auto py-4 px-2 sm:px-6 flex flex-col items-center'>
      <div className='flex gap-8'>
        <StepIcon step={1} currentStep={currentStep} />
        <StepIcon step={2} currentStep={currentStep} />
        <StepIcon step={3} currentStep={currentStep} />
      </div>

      {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} cupData={cupData} />}
      {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} cupData={cupData} />}
      {currentStep === 3 && <Step3 cupData={cupData.current} />}
    </div>
  )
}
