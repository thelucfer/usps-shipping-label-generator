import { Select, SelectProps } from '@/lib/components/ui/select'
import { useFieldContext } from '..'

type FormSelectProps<T extends object> = Omit<SelectProps<T>, 'onSelect' | 'selectedOption'>

export function FormSelect<T extends object>({
  options,
  formatSelectedValue,
  ...props
}: FormSelectProps<T> & { formatSelectedValue?: (value: string) => Promise<string> }) {
  const field = useFieldContext<string>()

  const selectedOption = options?.find((o) => field.state.value === props.getOptionId(o))

  return (
    <Select
      options={options}
      selectedOption={selectedOption}
      onSelect={(o) => {
        if (formatSelectedValue) {
          formatSelectedValue(props.getOptionId(o)).then(field.handleChange)
          return
        }

        field.handleChange(props.getOptionId(o))
      }}
      {...props}
    />
  )
}
