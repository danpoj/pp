// image
import { CheckIcon } from '../icons'

// etc
import { cn } from '@/lib/utils'
import { motion as m } from 'framer-motion'

type StepProps = { step: number; currentStep: number }

export default function StepIcon({ step, currentStep }: StepProps) {
  const status = step === currentStep ? 'active' : step < currentStep ? 'complete' : 'inactive'

  return (
    <m.div
      initial={false}
      animate={status}
      variants={{
        inactive: {
          backgroundColor: '#fff',
          borderColor: '#999',
          color: '#999',
        },
        active: {
          backgroundColor: '#fff',
          borderColor: '#3b82f6',
          color: '#3b82f6',
        },
        complete: {
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          color: '#3b82f6',
        },
      }}
      transition={{ duration: 0.2 }}
      className={cn('flex w-10 h-10 items-center justify-center rounded-full border-[2.5px] font-semibold')}
    >
      <div className='flex items-center justify-center font-bold text-lg'>
        {status === 'complete' ? <CheckIcon className='w-6 h-6 text-white' /> : <span>{step}</span>}
      </div>
    </m.div>
  )
}
