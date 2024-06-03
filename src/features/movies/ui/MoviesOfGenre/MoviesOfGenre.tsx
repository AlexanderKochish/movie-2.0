import { useState } from 'react'

import { ParsedUrlQuery } from 'node:querystring'

import { MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { MoviesFilter } from '@/features/movies/ui/MoviesFilter/MoviesFilter'
import { useFilterGenerete } from '@/shared/hooks/useFilterGenerete'
import { MovieCard } from '@/shared/ui/MovieCard/MovieCard'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import clsx from 'clsx'
import { IoMdClose } from 'react-icons/io'
import { VscSettings } from 'react-icons/vsc'

import s from './MoviesOfGenre.module.scss'

type Props = {
  currentPage: number
  data: MoviesResponseArgs | undefined
  genreName?: string | string[] | undefined
  genreType: string
  onChangePage: (page: number) => void
  pathname?: string
  query?: ParsedUrlQuery
}

export const MoviesOfGenres = ({
  currentPage,
  data,
  genreName,
  genreType,
  onChangePage,
  pathname = 'movies',
  query,
}: Props) => {
  const { genreList, rating, years } = useFilterGenerete({ genreType })
  const [isFilteredMenu, setIsFilteredMenu] = useState(false)

  return (
    <div className={s.block}>
      {query && (
        <>
          <div className={s.filtersTitle}>
            <h2>Movies{genreName && `: ${genreName}`}</h2>
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
        {data &&
          data.results.map(movie => <MovieCard key={movie.id} movie={movie} pathname={pathname} />)}
      </ul>
      <div className={s.pagination}>
        {data && (
          <Pagination
            currentPage={currentPage}
            onChangePage={onChangePage}
            pageSize={20}
            totalCount={data?.total_pages}
          />
        )}
      </div>
    </div>
  )
}
