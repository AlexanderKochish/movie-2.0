import { ReactElement } from 'react'

import { useGetGenresQuery, useGetMoviesOfGenresQuery } from '@/features/movies/api/movie-api'
import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'
import { useRouter } from 'next/router'

const Movies: Page = (context: any) => {
  const { data: genres } = useGetGenresQuery()
  const { query } = useRouter()
  const gen = query?.genre && genres?.genres.find((el: any) => el.name === query.genre)
  const { data } = useGetMoviesOfGenresQuery(gen?.id as string)

  return <MoviesOfGenres data={data?.results} query={query} />
}

export default Movies

Movies.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
