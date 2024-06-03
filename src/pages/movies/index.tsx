import { ReactElement, useEffect, useState } from 'react'

import { wrapper } from '@/app/store/store'
import {
  getGenres,
  getMoviesOfGenres,
  getRunningQueriesThunk,
  useGetMoviesOfGenresQuery,
  useGetPopularQuery,
} from '@/features/movies/api/movie-api'
import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { useFilterGenerete } from '@/shared/hooks/useFilterGenerete'
import { Page } from '@/shared/types/layout'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import Layout from '@/widgets/layout/ui/layout'
import { useRouter } from 'next/router'

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async context => {
  const genres = await dispatch(getGenres.initiate({ name: 'movie' }))
  const genreId = genres.data?.genres.find(item => item.name === context.query.genre)

  dispatch(
    getMoviesOfGenres.initiate({
      genreId: String(genreId),
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
  const [currentPage, setCurrentPage] = useState(1)
  const { query } = useRouter()
  const { genId } = useFilterGenerete({ genreType: 'movie' })

  const { data, isLoading } = useGetMoviesOfGenresQuery(
    {
      genreId: String(genId),
      page: Number(query.page) || currentPage,
      params: query,
    },
    { skip: !genId }
  )

  const { data: popular } = useGetPopularQuery(undefined, { skip: !!genId })

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    if (query.page) {
      setCurrentPage(Number(query.page))
    } else {
      setCurrentPage(1)
    }
  }, [query.page])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <MoviesOfGenres
      currentPage={currentPage}
      data={data || popular}
      genreName={query?.genre}
      genreType={'movies'}
      onChangePage={handlePageChange}
      query={query}
    />
  )
}

export default Movies

Movies.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
