import { createSearchParams } from '@/lib/helpers/formatters'

type ApiClient = {
  baseUrl: string
  baseHeaders?: Record<string, string>
}

export const createApiClient = ({ baseUrl, baseHeaders }: ApiClient) => {
  const request =
    (method: 'GET' | 'POST' | 'DELETE' | 'PUT') =>
    async <Y, T = unknown>(
      url: string,
      options?: {
        body?: T | undefined
        params?: Record<string, string | string[]>
      }
    ): Promise<Y> => {
      const makeUrl = () => {
        let finalUrl = `${baseUrl}${url}`

        if (options?.params) {
          finalUrl += `?${createSearchParams(options.params).toString()}`
        }

        return finalUrl
      }

      const res = await fetch(makeUrl(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...baseHeaders,
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
      })

      if (!res.ok) {
        const r = await res.json()

        console.log(r)

        throw new Error(`Failed to fetch ${url}`)
      }

      return res.json() as Promise<Y>
    }

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  } as const
}
