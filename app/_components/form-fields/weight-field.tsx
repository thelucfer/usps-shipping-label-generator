import { withForm } from '@/lib/form'
import { formOpts } from '@/lib/form/options'
import { formFields } from '@/lib/schema/form'

export const WeightField = withForm({
  ...formOpts,
  render: function Render({ form }) {
    return (
      <form.AppField
        name="weight"
        validators={{
          onChange: formFields.weight,
          onMount: formFields.weight,
        }}
        children={(field) => (
          <div>
            <label htmlFor="form-weight-field" className="text-[0.75rem]">
              Weight (oz)
            </label>
            <field.FormNumberField
              className="w-full"
              placeholder="Enter weight in ounces"
              id="form-weight-field"
            />
          </div>
        )}
      />
    )
  },
})
