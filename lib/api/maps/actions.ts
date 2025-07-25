import { env } from '@/lib/schema/env'
import { PostalAddress } from '@/lib/types'
import { Loader } from '@googlemaps/js-api-loader'

export const searchAddressByText = async ({
  address,
  userPosition,
}: {
  address: string
  userPosition?: { latitude: number; longitude: number }
}) => {
  const loader = new Loader({
    apiKey: env.client().NEXT_PUBLIC_MAPS_API_KEY,
    version: 'quarterly',
    libraries: ['places'],
  })

  const { Place } = await loader.importLibrary('places')

  const { places } = await Place.searchByText({
    textQuery: address,
    region: 'us',
    fields: ['displayName', 'id', 'postalAddress'],
    ...(userPosition && {
      locationBias: { lat: userPosition.latitude, lng: userPosition.longitude },
    }),
  })

  return places?.map((place) => ({
    id: place.id,
    displayName: place.displayName,
    ...('postalAddress' in place && { postalAddress: place.postalAddress as PostalAddress }),
  }))
}
