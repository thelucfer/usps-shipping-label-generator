'use server'

import { createApiClient } from '@/lib/api/client'
import { env } from '@/lib/schema/env'
import { Address, Shipment } from '@/lib/types'

const api = createApiClient({
  baseUrl: 'https://api.easypost.com/v2',
  baseHeaders: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${btoa(env.server().EASYPOST_API_KEY)}`,
  },
})

export const verifyAddress = async (address: Address) =>
  await api.post<{ id: string }>(`/addresses`, {
    body: {
      address,
      verify: true,
    },
  })

export const createShipment = async (shipment: {
  destinationAddress: string
  fromAddress: string
  length: number
  width: number
  height: number
  weight: number
}) =>
  await api.post<Shipment>(`/shipments`, {
    body: {
      shipment: {
        to_address: { id: shipment.destinationAddress },
        from_address: { id: shipment.fromAddress },
        parcel: {
          weight: shipment.weight,
          length: shipment.length,
          height: shipment.height,
          width: shipment.width,
        },
      },
    },
  })

export const buyShipment = async ({ shipmentId, rateId }: { shipmentId: string; rateId: string }) =>
  await api.post<{ postage_label: { label_url: string } }>(`/shipments/${shipmentId}/buy`, {
    body: {
      rate: {
        id: rateId,
      },
      insurance: 0,
    },
  })
