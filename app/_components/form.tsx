'use client'

import { DestinationAddressField } from '@/app/_components/form-fields/destination-address-field'
import { WidthField } from '@/app/_components/form-fields/form-width-field'
import { FromAddressField } from '@/app/_components/form-fields/from-address-field'
import { HeightField } from '@/app/_components/form-fields/height-field'
import { LengthField } from '@/app/_components/form-fields/length-field'
import { WeightField } from '@/app/_components/form-fields/weight-field'
import { easyPostApi } from '@/lib/api/easy-post'

import { useAppForm } from '@/lib/form'
import { formOpts } from '@/lib/form/options'
import { useMutation } from '@tanstack/react-query'

export function Form() {
  const { mutateAsync: createShipment } = useMutation({
    mutationFn: easyPostApi.createShipment,
  })

  const { mutateAsync: buyShipment } = useMutation({
    mutationFn: easyPostApi.buyShipment,
    onSuccess: (data) => {
      console.log('Shipment purchased successfully:', data)
    },
  })

  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const shipment = await createShipment(value)

      const { postage_label } = await buyShipment({
        shipmentId: shipment.id,
        rateId: shipment.rates[0].id,
      })

      window.open(postage_label.label_url, '_newtab')
    },
  })

  return (
    <form
      className={`
        flex grid-cols-[1fr_1fr] flex-col
        md:grid md:gap-[1rem]
      `}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit(e)
      }}
    >
      <h2 className="col-span-2">Shipping</h2>
      <FromAddressField form={form} />
      <DestinationAddressField form={form} />

      <div role="none" className="col-span-2 h-[1px] w-full bg-gray-800" />
      <h2 className="col-span-2">Package Details</h2>
      <WeightField form={form} />
      <LengthField form={form} />
      <HeightField form={form} />
      <WidthField form={form} />

      <form.AppForm>
        <form.FormSubmitButton
          label="Generate label"
          className={`
            col-start-2 my-[1rem] w-full place-self-end bg-purple-950 text-white
            hover:bg-pink-900
            md:w-fit
          `}
        />
      </form.AppForm>
    </form>
  )
}
