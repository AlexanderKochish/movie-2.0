import { ReactElement } from 'react'

import { wrapper } from '@/app/store/store'
import {
  getRunningQueriesThunk,
  getSeriesById,
  getSeriesCast,
  getSimilarSeries,
  getVideoSerialById,
  useGetMovieByIdQuery,
  useGetMovieCreditsByIdQuery,
  useGetSeriesByIdQuery,
  useGetSeriesCastQuery,
  useGetSimilarMoviesQuery,
  useGetSimilarSeriesQuery,
  useGetVideoByIdQuery,
  useGetVideoSerialByIdQuery,
} from '@/features/movies/api/movie-api'
import { MovieById } from '@/features/movies/ui/MovieById/MovieById'
import { SerialById } from '@/features/movies/ui/SerialById/SerialById'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'
import { useRouter } from 'next/router'

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async context => {
  const id = context.query.id

  dispatch(getSeriesById.initiate(id as string))
  dispatch(getSimilarSeries.initiate(id as string))
  dispatch(getSeriesCast.initiate(id as string))
  dispatch(getVideoSerialById.initiate(id as string))
  await Promise.all(dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const TVShowPage: Page = () => {
  const {
    query: { id },
  } = useRouter()

  const { data, isLoading } = useGetSeriesByIdQuery(id as string, { skip: !id })
  const { data: video, isLoading: isVideoLoad } = useGetVideoSerialByIdQuery(id as string, {
    skip: !id,
  })
  const { data: similar, isLoading: isSimilarLoad } = useGetSimilarSeriesQuery(id as string, {
    skip: !id,
  })
  const { data: credits } = useGetSeriesCastQuery(id as string, { skip: !id })

  return (
    <SerialById cast={credits} data={data} isLoading={isLoading} similar={similar} video={video} />
  )
}

TVShowPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default TVShowPage
