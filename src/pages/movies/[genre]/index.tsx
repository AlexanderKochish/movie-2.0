import { ReactElement } from 'react'

import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { NextPageWithLayout } from '@/pages/_app'
import Layout from '@/widgets/layout/ui/layout'
import { useRouter } from 'next/router'

const MoviesGenre: NextPageWithLayout = () => {
  return <MoviesOfGenres />
}

export default MoviesGenre

MoviesGenre.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
