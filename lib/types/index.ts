import { formSchema } from '@/lib/schema/form'
import z from 'zod'

export type Address = {
  street1: string
  city: string
  state: string
  zip: string
  country: string
  email?: string
  phone?: string
}

export type PostalAddress = {
  addressLines: string[]
  administrativeArea: string
  locality: string
  postalCode: string
}

export type Place = {
  id: string
  name: string
  postalAddress: PostalAddress
}

export type Shipment = {
  id: string
  rates: Array<{
    id: string
  }>
}

export type Setters<Type> = {
  [Property in keyof Type as `set${Capitalize<string & Property>}`]: (x: Type[Property]) => void
}

export type FormValues = z.infer<typeof formSchema>
