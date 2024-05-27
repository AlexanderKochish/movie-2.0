import { ReactElement } from 'react'

import { wrapper } from '@/app/store/store'
import {
  getGenres,
  getMoviesOfGenres,
  getRunningQueriesThunk,
} from '@/features/movies/api/movie-api'
import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'
import { useRouter } from 'next/router'

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async context => {
  const genres = await dispatch(getGenres.initiate())
  const genreId = genres.data?.genres.find(item => item.name === context.query.genre)

  dispatch(
    getMoviesOfGenres.initiate({
      genreId: String(genreId) || '28',
      page: Number(context.query.page) || 1,
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
