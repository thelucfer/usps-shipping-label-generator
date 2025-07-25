import { isUndefined } from '@/lib/helpers/guards'
import { Address, PostalAddress } from '@/lib/types'
import * as R from 'remeda'

export const createSearchParams = (
  params: Record<
    string,
    string | number | boolean | string[] | number[] | boolean[] | undefined | null
  >
) =>
  R.pipe(
    params,
    R.entries(),
    R.reduce((acc, [key, value]) => {
      if (isUndefined(value)) {
        return acc
      }

      if (Array.isArray(value)) {
        value.forEach((v) => {
          acc.append(key, String(v))
        })

        return acc
      }

      acc.append(key, String(value))
      return acc
    }, new URLSearchParams())
  )

export const mapToAddress = (googleMapsInput: PostalAddress): Address => ({
  street1: googleMapsInput.addressLines[0],
  city: googleMapsInput.locality,
  state: googleMapsInput.administrativeArea,
  zip: googleMapsInput.postalCode,
  country: 'US',
})

export const formatAddress = (input: Address) =>
  `${input.street1}, ${input.city}, ${input.state}, ${input.zip}`
