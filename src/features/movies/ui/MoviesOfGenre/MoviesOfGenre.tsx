import { useEffect, useState } from 'react'

import { ParsedUrlQuery } from 'node:querystring'

import {
  useGetGenresQuery,
  useGetMoviesOfGenresQuery,
  useGetPopularQuery,
} from '@/features/movies/api/movie-api'
import { GenerateSelectArgs, GenresArgs } from '@/features/movies/types/movies.types'
import { MoviesFilter } from '@/features/movies/ui/MoviesFilter/MoviesFilter'
import { MovieCard } from '@/shared/ui/MovieCard/MovieCard'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { IoMdClose } from 'react-icons/io'
import { VscSettings } from 'react-icons/vsc'

import s from './MoviesOfGenre.module.scss'

type Props = {
  query?: ParsedUrlQuery
}

export const MoviesOfGenres = ({ query }: Props) => {
  const [isFilteredMenu, setIsFilteredMenu] = useState(false)
  const router = useRouter()
  const { data: genre } = useGetGenresQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const genObj = genre?.genres.find(genre => genre.name == router.query.genre)
  const date = new Date()
  const { data, isLoading } = useGetMoviesOfGenresQuery(
    {
      genreId: String(genObj?.id),
      page: Number(router.query.page) || currentPage,
      params: router.query,
    },
    { skip: !genObj?.id }
  )

  const { data: popular } = useGetPopularQuery(undefined, { skip: !!genObj?.id })
  const genreList = genre?.genres.map((gen: GenresArgs, i) => ({
    label: i === 0 ? 'Genres' : gen.name,
    name: 'genre',
    value: String(gen.id),
  }))

  const generateArr = ({ defaultName, length, name, opts }: GenerateSelectArgs) => {
    return Array.from({ length }, (_, i) => ({
      label: i === 0 ? defaultName : String(opts ? opts + i + 1 : i + 1),
      name,
      value: String(opts ? opts + i + 1 : i + 1),
    })).reverse()
  }

  const years = generateArr({
    defaultName: 'All',
    length: date.getFullYear() - 1950,
    name: 'year',
    opts: 1950,
  })
  const rating = generateArr({ defaultName: 'All', length: 10, name: 'rating' })

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    if (router.query.page) {
      setCurrentPage(Number(router.query.page))
    } else {
      setCurrentPage(1)
    }
  }, [router.query.page])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={s.block}>
      {query && (
        <>
          <div className={s.filtersTitle}>
            <h2>Movies{router.query.genre && `: ${router.query.genre}`}</h2>
            <VscSettings
              className={s.filtersMenu}
              onClick={() => setIsFilteredMenu(prev => !prev)}
            />
          </div>
          <div className={!isFilteredMenu ? s.selects : clsx(s.selects, s.active)}>
            <IoMdClose className={s.closeFiltered} onClick={() => setIsFilteredMenu(false)} />
            <MoviesFilter
              genreList={genreList}
              isFilteredMenu={isFilteredMenu}
              rating={rating}
              years={years}
            />
          </div>
        </>
      )}

      <ul className={s.list}>
        {data && data.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        {popular && popular.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </ul>
      <div className={s.pagination}>
        {data && (
          <Pagination
            currentPage={currentPage}
            onChangePage={handlePageChange}
            pageSize={20}
            totalCount={data?.total_pages}
          />
        )}
        {popular && (
          <Pagination
            currentPage={currentPage}
            onChangePage={handlePageChange}
            pageSize={20}
            totalCount={popular?.total_pages}
          />
        )}
      </div>
    </div>
  )
}
