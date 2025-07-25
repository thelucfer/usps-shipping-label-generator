import { Input } from '@/lib/components/ui/input'
import { useFieldContext } from '@/lib/form'
import { ComponentProps } from 'react'

export function FormNumberField(props: Omit<ComponentProps<'input'>, 'onChange' | 'value'>) {
  const field = useFieldContext<number>()

  return (
    <Input
      value={field.state.value}
      onChange={(e) => {
        field.handleChange(Number(e.target.value))
      }}
      type="number"
      {...props}
    />
  )
}
