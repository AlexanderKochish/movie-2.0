import { ReactElement } from 'react'

import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'

const Movies: Page = (context: any) => {
  return <MoviesOfGenres />
}

export default Movies

Movies.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
