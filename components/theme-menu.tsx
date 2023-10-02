'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function ThemeMenu() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm'>
          <Sun className='h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='py-2 font-semibold'>
        <DropdownMenuItem onClick={() => setTheme('light')} className='flex justify-between'>
          밝게
          <Sun className='w-4 h-4' />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className='flex justify-between'>
          어둡게 <Moon className='w-4 h-4 rotate-[260deg]' />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className='flex justify-between'>
          시스템
          <Monitor className='w-4 h-4' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
