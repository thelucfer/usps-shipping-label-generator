import { FormNumberField } from '@/lib/form/components/form-number-field'
import { FormSelect } from '@/lib/form/components/form-select'
import { FormSubmitButton } from '@/lib/form/components/form-submit-button'
import { FormTextField } from '@/lib/form/components/form-text-field'
import { createFormHookContexts, createFormHook } from '@tanstack/react-form'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { FormSelect, FormTextField, FormNumberField },
  formComponents: { FormSubmitButton },
})
