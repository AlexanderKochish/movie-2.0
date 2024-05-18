import { useEffect, useState } from 'react'
import Select from 'react-select'

import { ParsedUrlQuery } from 'node:querystring'

import { useGetGenresQuery, useGetMoviesOfGenresQuery } from '@/features/movies/api/movie-api'
import { FilterTypes, GenresArgs, MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { Button } from '@/shared/ui/Button/Button'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { MySelect } from '@/shared/ui/Select/Select'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoMdClose } from 'react-icons/io'
import { VscSettings } from 'react-icons/vsc'

import s from './MoviesOfGenre.module.scss'

import ava from '../../../../../public/avatar-1577909_1280.webp'
type Props = {
  gen?: GenresArgs
  query?: ParsedUrlQuery
}

const sortBy = [
  { label: 'popularity.desc', name: 'popular', value: 'popularity.desc' },
  { label: 'popularity.asc', name: 'popular', value: 'popularity.asc' },
  { label: 'revenue.desc', name: 'popular', value: 'revenue.desc' },
  { label: 'revenue.asc', name: 'popular', value: 'revenue.asc' },
  { label: 'title.desc', name: 'popular', value: 'title.desc' },
]

export const MoviesOfGenres = ({ gen, query }: Props) => {
  const { data: genre } = useGetGenresQuery()
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState<FilterTypes | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<FilterTypes | null>(null)
  const [selectedPopular, setSelectedPopular] = useState<FilterTypes | null>(null)
  const [selectedRating, setSelectedRating] = useState<FilterTypes | null>(null)
  const [isFilteredMenu, setIsFilteredMenu] = useState(false)
  const genObj = genre?.genres.find(genre => genre.name == router.query.genre)

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
    label: i === 0 ? 'All ratings' : i,
    name: 'rating',
    value: String(i + 1),
  }))
  const date = new Date()
  const years = Array.from({ length: date.getFullYear() - 1950 }, (_, i) => ({
    label: i === 0 ? 'All years' : String(1950 + i + 1),
    name: 'year',
    value: String(1950 + i + 1),
  })).reverse()

  const handleFilterChange = (filterName: string, filterValue: string) => {
    const currentQuery = router.query
    const updatedQuery = {
      ...currentQuery,
      [filterName]: filterValue,
    }

    void router.push({
      pathname: router.pathname,
      query: updatedQuery,
    })
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={s.block}>
      {query && (
        <>
          <div className={s.filtersTitle}>
            <h2>Фильмы {query.genre || selectedGenre?.label}</h2>
            <VscSettings
              className={s.filtersMenu}
              onClick={() => setIsFilteredMenu(prev => !prev)}
            />
          </div>
          <div className={!isFilteredMenu ? s.selects : clsx(s.selects, s.active)}>
            <IoMdClose className={s.closeFiltered} onClick={() => setIsFilteredMenu(false)} />
            <div className={!isFilteredMenu ? s.firstBlock : clsx(s.firstBlock, s.active)}>
              <MySelect
                defaultValue={selectedGenre?.label}
                handleFilterChange={handleFilterChange}
                onChange={setSelectedGenre}
                options={genreList}
                placeholder={router.query.genre || 'Genre'}
                value={selectedGenre?.value || ''}
              />
              <MySelect
                defaultValue={selectedYear?.label}
                handleFilterChange={handleFilterChange}
                onChange={setSelectedYear}
                options={years}
                placeholder={router.query.year || 'Year'}
                value={selectedYear?.value || ''}
              />
              <MySelect
                defaultValue={selectedRating?.label}
                handleFilterChange={handleFilterChange}
                onChange={setSelectedRating}
                options={rating}
                placeholder={router.query.rating || 'Rating'}
                value={selectedRating?.value || ''}
              />
              <MySelect
                defaultValue={selectedPopular?.label}
                handleFilterChange={handleFilterChange}
                onChange={setSelectedPopular}
                options={sortBy}
                placeholder={selectedPopular?.label}
                value={selectedPopular?.value || ''}
              />
              <Button className={s.selectedBtn} fullWidth variant={'primary'}>
                Show results
              </Button>
            </div>
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
      </ul>
    </div>
  )
}
