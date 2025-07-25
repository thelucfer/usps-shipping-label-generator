import { withForm } from '@/lib/form'
import { formOpts } from '@/lib/form/options'
import { formFields } from '@/lib/schema/form'

export const LengthField = withForm({
  ...formOpts,
  render: function Render({ form }) {
    return (
      <form.AppField
        name="length"
        validators={{
          onChange: formFields.length,
          onMount: formFields.length,
        }}
        children={(field) => (
          <div>
            <label htmlFor="form-length-field" className="text-[0.75rem]">
              Length (in)
            </label>
            <field.FormNumberField
              className="w-full"
              placeholder="Enter length in inches"
              id="form-length-field"
            />
          </div>
        )}
      />
    )
  },
})
