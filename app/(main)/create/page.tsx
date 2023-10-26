'use client'

// type
import type { CupType } from '@prisma/client'

// etc
import { useRef, useState } from 'react'
import Step1 from '@/components/create/step1'
import StepIcon from '@/components/create/step-icon'
import dynamic from 'next/dynamic'

const Step2 = dynamic(() => import('@/components/create/step2'))
const Step3Image = dynamic(() => import('@/components/create/step3-image'))
const Step3Video = dynamic(() => import('@/components/create/step3-video'))

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
    <section className='h-full w-full sm:max-w-6xl mx-auto py-4 px-2 sm:px-6 flex flex-col items-center'>
      <div className='flex gap-8'>
        <StepIcon step={1} currentStep={currentStep} />
        <StepIcon step={2} currentStep={currentStep} />
        <StepIcon step={3} currentStep={currentStep} />
      </div>

      {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} cupData={cupData} />}
      {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} cupData={cupData} />}
      {currentStep === 3 && cupData.current.type === 'IMAGE' && <Step3Image cupData={cupData.current} />}
      {currentStep === 3 && cupData.current.type === 'VIDEO' && <Step3Video cupData={cupData.current} />}
    </section>
  )
}
