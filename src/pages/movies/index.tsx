import { ReactElement } from 'react'

import { wrapper } from '@/app/store/store'
import { getMoviesOfGenres, getRunningQueriesThunk } from '@/features/movies/api/movie-api'
import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'
import { useRouter } from 'next/router'

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async context => {
  dispatch(
    getMoviesOfGenres.initiate({
      genreId: '',
      params: context.query,
    })
  )
  await Promise.all(dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const Movies: Page = () => {
  const { query } = useRouter()

  return <MoviesOfGenres query={query} />
}

export default Movies

Movies.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
