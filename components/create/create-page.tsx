'use client'

import { useRef, useState } from 'react'

import StepIcon from '@/components/create/step-icon'

import Step1 from '@/components/create/step1'
import Step2 from '@/components/create/step2'
import Step3Image from '@/components/create/step3-image'
import Step3Video from '@/components/create/step3-video'
import { cupData } from '@/types/type'

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const cupData = useRef<cupData>({
    type: 'IMAGE',
    title: '',
    description: '',
  })

  return (
    <>
      <div className='flex gap-8'>
        <StepIcon step={1} currentStep={currentStep} />
        <StepIcon step={2} currentStep={currentStep} />
        <StepIcon step={3} currentStep={currentStep} />
      </div>

      {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} cupData={cupData} />}
      {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} cupData={cupData} />}
      {currentStep === 3 && cupData.current.type === 'IMAGE' && <Step3Image cupData={cupData.current} />}
      {currentStep === 3 && cupData.current.type === 'VIDEO' && <Step3Video cupData={cupData.current} />}
    </>
  )
}
