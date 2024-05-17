import {
  CreditsResponse,
  GenreResponse,
  MoviesResponseArgs,
  SelectMovieResponse,
  VideoResponse,
} from '@/features/movies/types/movies.types'
import { baseApi } from '@/shared/api/base-api'

const movieApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getComedy: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: `/discover/movie?sort_by=popularity.desc&with_genres=${35}`,
      }),
    }),
    getFamily: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: `/discover/movie?sort_by=popularity.desc&with_genres=${10751}`,
      }),
    }),
    getFantasy: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: `/discover/movie?sort_by=popularity.desc&with_genres=${14}`,
      }),
    }),
    getGenres: builder.query<GenreResponse, void>({
      query: () => ({
        url: '/genre/movie/list?language=en',
      }),
    }),
    getMovieById: builder.query<SelectMovieResponse, string>({
      query: id => ({
        url: `/movie/${id}?language=en`,
      }),
    }),
    getMovieByName: builder.query<MoviesResponseArgs, string>({
      query: name => ({
        url: `/search/movie?query=${name}&include_adult=true&language=en-US&video=true`,
      }),
    }),
    getMovieCreditsById: builder.query<CreditsResponse, string>({
      query: id => ({
        url: `/movie/${id}/credits?language=en`,
      }),
    }),
    getMoviesOfGenres: builder.query<
      MoviesResponseArgs,
      {
        genreId: string
        params: {
          popular?: string | undefined
          vote?: string | undefined
          year?: string | undefined
        }
      }
    >({
      query: ({ genreId, params }) => {
        return {
          params: {
            sort_by: params.popular,
            'vote_average.lte': params.vote,
            with_genres: genreId,
            year: params.year,
          },
          url: `/discover/movie`,
        }
      },
    }),
    getNowPlaying: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: `movie/now_playing?language=en-US&page=1`,
      }),
    }),
    getPopular: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: '/trending/all/day',
      }),
    }),
    getSimilarMovies: builder.query<MoviesResponseArgs | undefined, string>({
      query: id => ({
        url: `movie/${id}/recommendations?language=en-US&page=1`,
      }),
    }),
    getTopRating: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
      }),
    }),
    getUpComing: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: `movie/upcoming?language=en-US&page=1`,
      }),
    }),
    getVideoById: builder.query<VideoResponse, string>({
      query: id => ({
        url: `/movie/${id}/videos?language=en`,
      }),
    }),
  }),
})

export const {
  useGetComedyQuery,
  useGetFamilyQuery,
  useGetFantasyQuery,
  useGetGenresQuery,
  useGetMovieByIdQuery,
  useGetMovieByNameQuery,
  useGetMovieCreditsByIdQuery,
  useGetMoviesOfGenresQuery,
  useGetNowPlayingQuery,
  useGetPopularQuery,
  useGetSimilarMoviesQuery,
  useGetTopRatingQuery,
  useGetUpComingQuery,
  useGetVideoByIdQuery,
  util: { getRunningQueriesThunk },
} = movieApi

export const {
  getComedy,
  getFamily,
  getFantasy,
  getGenres,
  getNowPlaying,
  getPopular,
  getSimilarMovies,
  getTopRating,
  getUpComing,
} = movieApi.endpoints
