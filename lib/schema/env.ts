import z from 'zod'

const envClientSchema = z.object({
  NEXT_PUBLIC_MAPS_API_KEY: z.string(),
})

const envServerSchema = z.object({
  EASYPOST_API_KEY: z.string(),
})

const client = () => {
  const result = envClientSchema.safeParse({
    NEXT_PUBLIC_MAPS_API_KEY: process.env.NEXT_PUBLIC_MAPS_API_KEY,
  })

  if (!result.success) {
    throw new Error(`env validation has failed. please check your env variables: ${result.error}`)
  }

  return result.data
}

const server = () => {
  const result = envServerSchema.safeParse({
    EASYPOST_API_KEY: process.env.EASYPOST_API_KEY,
  })

  if (!result.success) {
    throw new Error(`env validation has failed. please check your env variables: ${result.error}`)
  }

  return result.data
}
export const env = {
  client,
  server,
} as const
