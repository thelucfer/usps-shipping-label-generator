import { Button } from '@/lib/components/ui/button'
import { useFormContext } from '@/lib/form'
import { cn } from '@/lib/helpers/utils'
import type { ReactNode } from 'react'

export function FormSubmitButton({
  label,
  disabled,
  className,
}: {
  label: ReactNode
  disabled?: boolean
  className?: string
}) {
  const form = useFormContext()

  return (
    <form.Subscribe
      selector={(state) => {
        return [state.isSubmitting, state.canSubmit, state.isValid && !state.isPristine]
      }}
    >
      {([isSubmitting, canSubmit, isFormValid]) => (
        <Button
          disabled={!canSubmit || isSubmitting || !isFormValid || disabled}
          className={cn('px-[2rem]', className)}
          type="submit"
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}
