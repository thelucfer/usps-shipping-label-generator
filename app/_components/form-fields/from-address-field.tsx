import { AddressCard } from '@/app/_components/address-card'
import { easyPostApi } from '@/lib/api/easy-post'
import { useDebouncedValue } from '@/lib/hooks/use-debounced-value'
import { searchAddressQuery } from '@/lib/query'
import { Address } from '@/lib/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { formatAddress, mapToAddress } from '@/lib/helpers/formatters'
import { withForm } from '@/lib/form'
import { formFields } from '@/lib/schema/form'
import { formOpts } from '@/lib/form/options'

export const FromAddressField = withForm({
  ...formOpts,
  render: function Render({ form }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedAddress, setSelectedAddress] = useState<Address>()

    const debouncedInputText = useDebouncedValue(searchQuery, 500)

    const { data: addresses } = useQuery(
      searchAddressQuery({
        address: debouncedInputText,
        userPosition: undefined,
      })
    )

    const { mutateAsync: verifyAddress } = useMutation({
      mutationFn: easyPostApi.verifyAddress,
    })

    return (
      <div className="flex flex-col">
        <label htmlFor="from-address-search" className="text-[0.75rem]">
          From address
        </label>
        <form.AppField
          name="fromAddress"
          validators={{
            onChange: formFields.destinationAddress,
            onMount: formFields.destinationAddress,
          }}
          children={(field) => (
            <field.FormSelect
              options={addresses?.map((address) => ({
                label: address.displayName,
                value: address.id,
              }))}
              id="from-address-search"
              getOptionId={(o) => o.value ?? ''}
              getOptionLabel={(o) => o.label ?? ''}
              formatSelectedValue={async (opt) => {
                const address = addresses?.find((address) => address.id === opt)

                if (!address) return ''
                if (!address.postalAddress) return ''

                const addressObject = mapToAddress(address.postalAddress)

                setSelectedAddress(addressObject)
                const { id } = await verifyAddress(addressObject)

                return id
              }}
              renderOption={(opt) => {
                const address = addresses?.find((address) => address.id === opt.value)

                if (!address) return null
                if (!address.postalAddress) return null

                const addressObject = mapToAddress(address.postalAddress)

                return (
                  <AddressCard
                    displayName={opt.label ?? undefined}
                    address={formatAddress(addressObject)}
                  />
                )
              }}
              label={'Search an address'}
              onChange={setSearchQuery}
            />
          )}
        />
        {selectedAddress && (
          <div className="flex gap-[0.5rem] bg-blue-950 p-[1rem]">
            <span className="text-muted-foreground">Selected: </span>
            {formatAddress(selectedAddress)}
          </div>
        )}
      </div>
    )
  },
})
