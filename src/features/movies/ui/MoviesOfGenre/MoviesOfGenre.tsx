import { useState } from 'react'

import { ParsedUrlQuery } from 'node:querystring'

import { useGetGenresQuery, useGetMoviesOfGenresQuery } from '@/features/movies/api/movie-api'
import { GenresArgs } from '@/features/movies/types/movies.types'
import { MoviesFilter } from '@/features/movies/ui/MoviesFilter/MoviesFilter'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

  const genObj = genre?.genres.find(genre => genre.name == router.query.genre)
  const date = new Date()
  const { data, isLoading } = useGetMoviesOfGenresQuery({
    genreId: String(genObj?.id || 28),
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

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={s.block}>
      {query && (
        <>
          <div className={s.filtersTitle}>
            <h2>Фильмы {query.genre || router.query.genre}</h2>
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
          data.results.map((movie: any) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <li className={s.card}>
                <Image
                  alt={movie.title || 'poster'}
                  className={s.img}
                  fill
                  src={
                    movie.poster_path
                      ? `${process.env.NEXT_PUBLIC_IMAGE_342}${movie.poster_path || movie.backdrop_path}`
                      : ava
                  }
                />
                <div className={s.cardInfo}>
                  <div className={s.cardRating}>{movie.vote_average.toFixed(1)}</div>
                  <div className={s.infoFooter}>
                    <div>{movie.title || movie.original_title}</div>
                    <div className={s.year}>{movie.release_date?.substring(0, 4) || ''}</div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        {/*<Pagination data={data} item={data?.total_results || 160} onTotal={data?.total_pages} />*/}
      </ul>
    </div>
  )
}
