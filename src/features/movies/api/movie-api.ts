import {
  CreditsResponse,
  GenreResponse,
  MovieFilterArgs,
  MoviesResponseArgs,
  SelectMovieResponse,
  SerialsResponse,
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
    getGenres: builder.query<GenreResponse, { name: string }>({
      query: name => ({
        url: `/genre/${name.name}/list?language=en`,
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
    getMoviesOfGenres: builder.query<MoviesResponseArgs, MovieFilterArgs>({
      query: ({ genreId, page, params }) => {
        return {
          params: {
            page: page,
            sort_by: params.popular,
            'vote_average.lte': params.rating,
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
    getSeriesById: builder.query<SerialsResponse, string>({
      query: id => ({
        url: `/tv/${id}?language=en`,
      }),
    }),
    getSeriesCast: builder.query<CreditsResponse, string>({
      query: id => ({
        url: `/tv/${id}/credits?language=en`,
      }),
    }),
    getSimilarMovies: builder.query<MoviesResponseArgs | undefined, string>({
      query: id => ({
        url: `movie/${id}/recommendations?language=en-US&page=1`,
      }),
    }),
    getSimilarSeries: builder.query<MoviesResponseArgs | undefined, string>({
      query: id => ({
        url: `tv/${id}/recommendations?language=en-US&page=1`,
      }),
    }),
    getTopRating: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
      }),
    }),
    getTv: builder.query<MoviesResponseArgs, void>({
      query: () => ({
        url: `/discover/tv`,
      }),
    }),
    getTvShows: builder.query<MoviesResponseArgs, MovieFilterArgs>({
      query: ({ genreId, page, params }) => ({
        params: {
          page: page,
          sort_by: params.popular,
          'vote_average.lte': params.rating,
          with_genres: genreId,
          year: params.year,
        },
        url: `/discover/tv`,
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
    getVideoSerialById: builder.query<VideoResponse, string>({
      query: id => ({
        url: `/tv/${id}/videos?language=en`,
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
  useGetSeriesByIdQuery,
  useGetSeriesCastQuery,
  useGetSimilarMoviesQuery,
  useGetSimilarSeriesQuery,
  useGetTopRatingQuery,
  useGetTvQuery,
  useGetTvShowsQuery,
  useGetUpComingQuery,
  useGetVideoByIdQuery,
  useGetVideoSerialByIdQuery,
  util: { getRunningQueriesThunk },
} = movieApi

export const {
  getComedy,
  getFamily,
  getFantasy,
  getGenres,
  getMoviesOfGenres,
  getNowPlaying,
  getPopular,
  getSeriesById,
  getSeriesCast,
  getSimilarMovies,
  getSimilarSeries,
  getTopRating,
  getTv,
  getTvShows,
  getUpComing,
  getVideoSerialById,
} = movieApi.endpoints
