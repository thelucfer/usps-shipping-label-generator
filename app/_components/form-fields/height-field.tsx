import { withForm } from '@/lib/form'
import { formOpts } from '@/lib/form/options'
import { formFields } from '@/lib/schema/form'

export const HeightField = withForm({
  ...formOpts,
  render: function Render({ form }) {
    return (
      <form.AppField
        name="height"
        validators={{
          onChange: formFields.height,
          onMount: formFields.height,
        }}
        children={(field) => (
          <div>
            <label htmlFor="form-height-field" className="text-[0.75rem]">
              Height (in)
            </label>
            <field.FormNumberField
              className="w-full"
              placeholder="Enter height in inches"
              id="form-height-field"
            />
          </div>
        )}
      />
    )
  },
})
