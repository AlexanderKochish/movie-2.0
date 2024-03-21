import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie, setCookie } from 'cookies-next'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API,
    prepareHeaders: headers => {
      const accessToken = getCookie('accessToken')

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      } else {
        setCookie('accessToken', process.env.NEXT_PUBLIC_JWT)
        headers.set('Authorization', `Bearer ${accessToken}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
})
