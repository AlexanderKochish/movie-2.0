import { ReactElement } from 'react'

import { wrapper } from '@/app/store/store'
import {
  getRunningQueriesThunk,
  getTvShows,
  useGetTvShowsQuery,
} from '@/features/movies/api/movie-api'
import { MovieList } from '@/features/movies/ui/MovieList/MovieList'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async context => {
  dispatch(getTvShows.initiate(undefined))

  await Promise.all(dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const Series: Page = () => {
  const { data } = useGetTvShowsQuery(undefined)

  return <MovieList data={data?.results} />
}

export default Series

Series.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
