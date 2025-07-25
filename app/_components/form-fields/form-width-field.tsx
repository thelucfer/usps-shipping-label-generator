import { withForm } from '@/lib/form'
import { formOpts } from '@/lib/form/options'
import { formFields } from '@/lib/schema/form'

export const WidthField = withForm({
  ...formOpts,
  render: function Render({ form }) {
    return (
      <form.AppField
        name="width"
        validators={{
          onChange: formFields.width,
          onMount: formFields.width,
        }}
        children={(field) => (
          <div>
            <label htmlFor="form-width-field" className="text-[0.75rem]">
              Width (in)
            </label>
            <field.FormNumberField
              className="w-full"
              placeholder="Enter length in inches"
              id="form-width-field"
            />
          </div>
        )}
      />
    )
  },
})
