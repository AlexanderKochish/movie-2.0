import { ReactElement, useState } from 'react'

import { wrapper } from '@/app/store/store'
import {
  getGenres,
  getRunningQueriesThunk,
  getTvShows,
  useGetTvQuery,
  useGetTvShowsQuery,
} from '@/features/movies/api/movie-api'
import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { useFilterGenerete } from '@/shared/hooks/useFilterGenerete'
import { Page } from '@/shared/types/layout'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import Layout from '@/widgets/layout/ui/layout'
import { useRouter } from 'next/router'

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async context => {
  const genres = await dispatch(getGenres.initiate({ name: 'tv' }))
  const genreId = genres.data?.genres.find(item => item.name === context.query.genre)

  dispatch(
    getTvShows.initiate({
      genreId: String(genreId?.id),
      page: Number(context.query.page) || 1,
      params: context.query,
    })
  )

  await Promise.all(dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const Series: Page = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { genId } = useFilterGenerete({ genreType: 'tv' })
  const { query } = useRouter()

  const { data, isLoading } = useGetTvShowsQuery(
    {
      genreId: String(genId),
      page: currentPage,
      params: query,
    },
    { skip: !genId }
  )
  const { data: tv } = useGetTvQuery(undefined, { skip: !!genId })

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <MoviesOfGenres
      currentPage={currentPage}
      data={data || tv}
      genreName={query?.genre}
      genreType={'tv'}
      onChangePage={handlePageChange}
      pathname={'series'}
      query={query}
    />
  )
}

export default Series

Series.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
