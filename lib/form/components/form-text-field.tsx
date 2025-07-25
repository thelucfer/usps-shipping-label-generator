import { Input } from '@/lib/components/ui/input'
import { useFieldContext } from '@/lib/form'
import { ComponentProps } from 'react'

export function FormTextField(props: Omit<ComponentProps<'input'>, 'onChange' | 'value'>) {
  const field = useFieldContext<string>()

  return (
    <Input
      value={field.state.value}
      onChange={(e) => {
        field.handleChange(e.target.value)
      }}
      {...props}
    />
  )
}
