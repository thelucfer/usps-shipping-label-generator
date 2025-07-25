import { greatherThan } from '@/lib/helpers/utils'
import z from 'zod'

export const formFields = {
  fromAddress: z.string().min(1, 'From address is required'),
  destinationAddress: z.string().min(1, 'Destination address is required'),
  length: z.number().refine(greatherThan(0)),
  width: z.number().refine(greatherThan(0)),
  height: z.number().refine(greatherThan(0)),
  weight: z.number().refine(greatherThan(0)),
}

export const formSchema = z.object(formFields)
