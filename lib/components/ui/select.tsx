import { useEffect, useId, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { SearchIcon } from 'lucide-react'
import { checkExhaustive } from '@/lib/helpers/guards'
import { cn } from '@/lib/helpers/utils'
import { SelectOption } from './select-option'
import { Input } from '@/lib/components/ui/input'

export type SelectProps<T extends object> = {
  options: T[] | undefined
  selectedOption: T | undefined
  id: string
  onSelect: (option: T) => void
  onChange?: (text: string) => void
  renderOption: (option: T, isSelected: boolean) => ReactNode
  getOptionId: (option: T) => string
  getOptionLabel: (option: T) => string
  className?: string
  label: string
}

export function Select<T extends object>({
  options,
  id,
  selectedOption,
  onSelect,
  renderOption,
  getOptionId,
  getOptionLabel,
  onChange,
  className,
  label,
}: SelectProps<T>) {
  const [showOptions, setShowOptions] = useState(false)
  const [inputText, setInputText] = useState(selectedOption ? getOptionLabel(selectedOption) : '')

  const [currentFocusedOption, setCurrentFocusedOption] = useState(-1)

  const selectListId = useId()

  const onSelectInternal = (newOption: T) => {
    onSelect(newOption)
    setInputText(getOptionLabel(newOption))

    setCurrentFocusedOption(-1)
    setShowOptions(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const specialKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape'] as const
    type SpecialKey = (typeof specialKeys)[number]

    const isSpecialKey = (key: string): key is SpecialKey => specialKeys.includes(key as SpecialKey)

    if (!isSpecialKey(e.key) || !options) {
      return
    }

    if (!showOptions) {
      if (e.key === 'Escape') return

      setShowOptions(true)
      return
    }

    switch (e.key) {
      case 'Escape': {
        e.stopPropagation()
        setCurrentFocusedOption(-1)
        setShowOptions(false)
        return
      }

      case 'ArrowDown': {
        e.preventDefault()
        setCurrentFocusedOption((prev) => (prev + 1) % options.length)
        return
      }

      case 'ArrowUp': {
        e.preventDefault()
        setCurrentFocusedOption((prev) => (prev - 1 + options.length) % options.length)
        return
      }

      case 'Enter': {
        if (currentFocusedOption === -1) {
          return
        }
        e.preventDefault()
        if (!options[currentFocusedOption]) return

        onSelectInternal(options[currentFocusedOption])
        return
      }

      default: {
        checkExhaustive(e.key)
      }
    }
  }

  useEffect(() => {
    if (selectedOption) return

    setInputText('')
  }, [selectedOption])

  return (
    <div
      role="none"
      className={cn('relative w-full', className)}
      onFocus={() => {
        setInputText('')
        setShowOptions(true)
      }}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return

        if (!selectedOption) {
          setInputText('')
        }

        if (selectedOption) {
          setInputText(getOptionLabel(selectedOption))
        }

        setShowOptions(false)
        setCurrentFocusedOption(-1)
      }}
    >
      <div
        role="none"
        className={cn([
          `
            relative isolate grid grid-cols-[1fr_auto] grid-rows-[1fr]
            items-center transition-all
          `,
        ])}
        data-testid={`${id}__container`}
      >
        <Input
          type="text"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={showOptions}
          aria-controls={selectListId}
          className={`
            peer pointer-events-auto relative z-0 col-span-2 col-start-1
            row-span-1 row-start-1 bg-transparent
          `}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
            onChange?.(e.target.value)
          }}
          onKeyDown={handleKeyDown}
          id={id}
          placeholder={label}
        />
        <SearchIcon
          className={`
            pointer-events-auto z-2 col-span-1 col-start-2 row-start-1
            mr-[0.5rem] flex w-[1rem] place-items-center transition-all
          `}
        />
      </div>
      {showOptions && (
        <ul
          className={`
            absolute top-[100%] z-[999] grid max-h-[21.875rem] w-full
            overflow-auto bg-popover shadow-lg
          `}
          role="listbox"
          id={selectListId}
          data-testid={`dropdown-${id}__optionsList`}
        >
          {!options && <>Start typing to show options</>}
          {options?.map((option, index) => (
            <SelectOption
              option={option}
              key={getOptionId(option)}
              isFocused={index === currentFocusedOption}
              isSelected={
                selectedOption ? getOptionId(option) === getOptionId(selectedOption) : false
              }
              setToFocused={() => {
                setCurrentFocusedOption(index)
              }}
              setToSelected={() => {
                onSelectInternal(option)
              }}
              renderOption={renderOption}
              testId={`dropdown-${id}__option--${getOptionId(option)}`}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
