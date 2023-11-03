import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'

type Props = {
  toggleHidingHeader: () => void
  isHidingHeader: boolean
}

export default function ToggleHeaderButton({ toggleHidingHeader, isHidingHeader }: Props) {
  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild className='bg-white/80'>
          <button
            onClick={toggleHidingHeader}
            className={cn(
              'absolute right-2 sm:right-3 bg-white/90 hover:bg-white p-2 rounded-full z-[999]',
              isHidingHeader ? 'top-1.5' : 'top-[52px]'
            )}
          >
            {isHidingHeader ? (
              <ChevronDown className='stroke-black w-4 h-4 stroke-[3px]' />
            ) : (
              <ChevronUp className='stroke-black w-4 h-4 stroke-[3px]' />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className='mr-2' side='bottom'>
          <p className='text-xs'>전체화면 설정</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
