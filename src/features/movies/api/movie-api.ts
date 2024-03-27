import { GenreResponse, MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { baseApi } from '@/shared/api/base-api'

const movieApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getGenres: builder.query<GenreResponse, void>({
      query: () => ({
        url: '/genre/movie/list?language=en',
      }),
    }),
    getMoviesOfGenres: builder.query<MoviesResponseArgs, string>({
      query: id => ({
        url: `/discover/movie?sort_by=popularity.desc&with_genres=${id}`,
      }),
    }),
    getPopular: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: '/trending/all/day',
      }),
    }),
  }),
})

export const { useGetGenresQuery, useGetMoviesOfGenresQuery, useGetPopularQuery } = movieApi
