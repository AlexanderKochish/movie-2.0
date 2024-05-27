import { use, useEffect, useState } from 'react'

import { ParsedUrlQuery } from 'node:querystring'

import { useGetGenresQuery, useGetMoviesOfGenresQuery } from '@/features/movies/api/movie-api'
import { GenresArgs } from '@/features/movies/types/movies.types'
import { MoviesFilter } from '@/features/movies/ui/MoviesFilter/MoviesFilter'
import { Button } from '@/shared/ui/Button/Button'
import { MovieCard } from '@/shared/ui/MovieCard/MovieCard'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { VscSettings } from 'react-icons/vsc'

import s from './MoviesOfGenre.module.scss'

import ava from '../../../../../public/avatar-1577909_1280.webp'

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
  const { data, isLoading } = useGetMoviesOfGenresQuery({
    genreId: String(genObj?.id || 28),
    page: Number(router.query.page) || currentPage,
    params: router.query,
  })

  const genreList = genre?.genres.map((gen: GenresArgs, i) => ({
    label: i === 0 ? 'Genres' : gen.name,
    name: 'genre',
    value: String(gen.id),
  }))

  const rating = Array.from({ length: 10 }, (_, i) => ({
    label: i === 0 ? 'All ratings' : i + 1,
    name: 'rating',
    value: String(i + 1),
  })).reverse()

  const years = Array.from({ length: date.getFullYear() - 1950 }, (_, i) => ({
    label: i === 0 ? 'All years' : String(1950 + i + 1),
    name: 'year',
    value: String(1950 + i + 1),
  })).reverse()

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
      </ul>
      <div
        style={{ alignItems: 'center', display: 'flex', gap: 10, padding: '20px 0', width: '100%' }}
      >
        {data && (
          <Pagination
            currentPage={currentPage}
            onChangePage={handlePageChange}
            pageSize={20}
            totalCount={data?.total_pages}
          />
        )}
      </div>
    </div>
  )
}
