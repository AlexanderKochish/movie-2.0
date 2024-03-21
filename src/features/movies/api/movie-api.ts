import { MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { baseApi } from '@/shared/api/base-api'

const movieApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPopular: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: '/trending/all/day',
      }),
    }),
  }),
})

export const { useGetPopularQuery } = movieApi
