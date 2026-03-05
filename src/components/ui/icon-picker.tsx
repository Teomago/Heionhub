'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Tag } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/buttons/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { categoryIcons } from '@/constants/category-icons'

interface IconPickerProps {
  value: string
  onChange: (value: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = React.useState(false)

  const selectedIcon = categoryIcons.find((icon) => icon.value === value) || categoryIcons[0]

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            <div className="flex items-center gap-2">
              {selectedIcon ? (
                <selectedIcon.icon className="h-4 w-4" />
              ) : (
                <Tag className="h-4 w-4" />
              )}
              {selectedIcon?.label || value}
            </div>
          ) : (
            'Select icon...'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search icon..." />
          <CommandList>
            <CommandEmpty>No icon found.</CommandEmpty>
            <CommandGroup>
              {categoryIcons.map((icon) => (
                <CommandItem
                  key={icon.value}
                  value={icon.value}
                  onSelect={(currentValue: string) => {
                    onChange(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === icon.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <icon.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  {icon.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
