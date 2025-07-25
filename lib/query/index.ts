import { mapsApi } from '@/lib/api/maps'
import type { AddressLookupParams } from '@/lib/types/api'
import { queryOptions } from '@tanstack/react-query'
import { QueryKeys } from '../constants/query'

export const searchAddressQuery = ({ address, userPosition }: AddressLookupParams) =>
  queryOptions({
    queryKey: [QueryKeys.ADDRESS, address, userPosition],
    queryFn: async () => await mapsApi.searchAddressByText({ address, userPosition }),
    enabled: address.length >= 2,
  })
