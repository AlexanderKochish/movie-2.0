import { ReactElement } from 'react'

import { MovieById } from '@/features/movies/ui/MovieById/MovieById'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'
import { useRouter } from 'next/router'

const MoviePage: Page = () => {
  const { query } = useRouter()

  return <MovieById id={query?.id} />
}

export default MoviePage

MoviePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
