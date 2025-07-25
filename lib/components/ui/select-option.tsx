import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export const SelectOption = <T extends object>({
  option,
  isFocused,
  isSelected,
  setToFocused,
  setToSelected,
  renderOption,
  testId,
}: {
  option: T
  isFocused: boolean
  isSelected: boolean
  setToFocused: () => void
  setToSelected: () => void
  renderOption: (option: T, isSelected: boolean) => ReactNode
  testId: string
}) => {
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!isFocused) return

    ref.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [isFocused])

  return (
    <li
      className={`
        p-[1rem] transition-all
        not-last-of-type:border-b
        aria-selected:bg-gray-800
      `}
      role="option"
      aria-selected={isFocused}
      data-testid={testId}
      ref={ref}
    >
      <button
        type="button"
        className={`
          flex w-full cursor-pointer place-items-center justify-between
          text-left text-[0.875rem]
        `}
        onClick={setToSelected}
        onMouseEnter={setToFocused}
        tabIndex={-1}
      >
        {renderOption(option, isSelected)}
      </button>
    </li>
  )
}
