import { ReactElement } from 'react'

import { useGetGenresQuery, useGetMoviesOfGenresQuery } from '@/features/movies/api/movie-api'
import { GenresArgs } from '@/features/movies/types/movies.types'
import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'
import { useRouter } from 'next/router'

const Movies: Page = (context: any) => {
  const { data: genres } = useGetGenresQuery()
  const { query } = useRouter()
  const gen = genres?.genres.find((el: GenresArgs) => el.name === query.genre)
  const { data } = useGetMoviesOfGenresQuery(String(gen?.id))

  return <MoviesOfGenres data={data?.results} query={query} />
}

export default Movies

Movies.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
