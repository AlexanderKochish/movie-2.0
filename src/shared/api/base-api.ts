import type { Action, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/app/store/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie, setCookie } from 'cookies-next'
import { HYDRATE } from 'next-redux-wrapper'

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}
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
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'baseApi',
})
