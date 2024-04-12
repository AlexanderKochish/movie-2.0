import { baseApi } from '@/shared/api/base-api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createWrapper } from 'next-redux-wrapper'

export const makeStore = () =>
  configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
