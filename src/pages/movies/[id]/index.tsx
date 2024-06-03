import { ReactElement, useEffect, useState } from 'react'

import { useGetPopularQuery } from '@/features/movies'
import {
  useGetGenresQuery,
  useGetMovieByIdQuery,
  useGetMovieCreditsByIdQuery,
  useGetMoviesOfGenresQuery,
  useGetSimilarMoviesQuery,
  useGetVideoByIdQuery,
} from '@/features/movies/api/movie-api'
import { GenerateSelectArgs, GenresArgs } from '@/features/movies/types/movies.types'
import { MovieById } from '@/features/movies/ui/MovieById/MovieById'
import { useFilterGenerete } from '@/shared/hooks/useFilterGenerete'
import { Page } from '@/shared/types/layout'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import Layout from '@/widgets/layout/ui/layout'
import { useRouter } from 'next/router'

const MoviePage: Page = () => {
  const {
    query: { id },
  } = useRouter()

  const { data, isLoading } = useGetMovieByIdQuery(id as string, { skip: !id })
  const { data: video, isLoading: isVideoLoad } = useGetVideoByIdQuery(id as string, { skip: !id })
  const { data: similar, isLoading: isSimilarLoad } = useGetSimilarMoviesQuery(id as string, {
    skip: !id,
  })
  const { data: credits } = useGetMovieCreditsByIdQuery(id as string, { skip: !id })

  return (
    <MovieById cast={credits} data={data} isLoading={isLoading} similar={similar} video={video} />
  )
}

export default MoviePage

MoviePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
