import { ActorCastResponse, ActorProfile } from '@/features/actors/types/actors.types'
import { baseApi } from '@/shared/api/base-api'

const actorsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getActorById: build.query<ActorProfile, number>({
      query: id => ({
        url: `person/${id}?language=en-US'`,
      }),
    }),
    getActorMoviesById: build.query<ActorCastResponse, number>({
      query: id => ({
        url: `/person/${id}/movie_credits?language=en-US`,
      }),
    }),
  }),
})

export const { useGetActorByIdQuery, useGetActorMoviesByIdQuery } = actorsApi

export const { getActorById, getActorMoviesById } = actorsApi.endpoints
