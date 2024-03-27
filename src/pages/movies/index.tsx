import { ReactElement } from 'react'

import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { NextPageWithLayout } from '@/pages/_app'
import Layout from '@/widgets/layout/ui/layout'

const Movies: NextPageWithLayout = (context: any) => {
  return <MoviesOfGenres />
}

export default Movies

Movies.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
