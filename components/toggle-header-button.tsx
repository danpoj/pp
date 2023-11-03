import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ChevronDown, Settings } from 'lucide-react'

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
              'absolute right-2 sm:right-3 bg-white/90 hover:bg-white p-2 rounded-full z-[999] outline outline-black',
              isHidingHeader ? 'top-1.5' : 'top-[52px]'
            )}
          >
            <ChevronDown
              className={cn('stroke-black w-4 h-4 stroke-[3px] transition', isHidingHeader ? '' : 'rotate-180')}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent className='mr-2' side='bottom'>
          <p className='text-xs flex items-center gap-0.5 border-b py-1'>
            <Settings className='w-3 h-3' />
            전체화면
          </p>
          <div className='flex gap-1 mt-2'>
            <div className='px-2 py-0.5 bg-background text-foreground rounded text-xs text-[10px]'>⌘ + .</div>
            <div className='px-2 py-0.5 bg-background text-foreground rounded text-xs text-[10px]'>ctrl + .</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
