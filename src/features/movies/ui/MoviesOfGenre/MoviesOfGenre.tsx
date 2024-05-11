import { useState } from 'react'
import Select from 'react-select'

import { useGetGenresQuery, useGetMoviesOfGenresQuery } from '@/features/movies/api/movie-api'
import { GenresArgs, MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { Button } from '@/shared/ui/Button/Button'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { MySelect } from '@/shared/ui/Select/Select'
import Image from 'next/image'
import Link from 'next/link'

import s from './MoviesOfGenre.module.scss'

import ava from '../../../../../public/avatar-1577909_1280.webp'
type Props = {
  gen?: any
  query?: any
}

const years = [
  { label: 'Year of release', value: 'Year of release' },
  { label: 'All years', value: 'All years' },
  { label: '2024', value: '2024' },
  { label: '2023', value: '2023' },
  { label: '2022', value: '2022' },
  { label: '2021', value: '2021' },
  { label: '2020', value: '2020' },
  { label: '2019', value: '2019' },
  { label: '2018', value: '2018' },
  { label: '2017', value: '2017' },
  { label: '2016', value: '2016' },
  { label: '2015', value: '2015' },
  { label: '2014', value: '2014' },
  { label: '2013', value: '2013' },
]

const sortBy = [
  { label: 'popularity.desc', value: 'popularity.desc' },
  { label: 'popularity.asc', value: 'popularity.asc' },
  { label: 'revenue.desc', value: 'revenue.desc' },
  { label: 'revenue.asc', value: 'revenue.asc' },
  { label: 'title.desc', value: 'title.desc' },
]

export const MoviesOfGenres = ({ gen, query }: Props) => {
  const { data: genre } = useGetGenresQuery()
  const [selectedYear, setSelectedYear] = useState('Genre')
  const [selectedGenre, setSelectedGenre] = useState('Genre')
  const [selectedPopular, setSelectedPopular] = useState('Genre')
  const [selectedRating, setSelectedRating] = useState('Genre')

  const genreList = genre?.genres.map((gen: GenresArgs, i) => ({
    label: i === 0 ? 'Genres' : gen.name,
    value: String(gen.id),
  }))

  const rating = Array.from({ length: 10 }, (_, i) => ({
    label: i === 0 ? 'All ratings' : i,
    value: String(i + 1),
  }))
  const { data } = useGetMoviesOfGenresQuery({
    id: String(selectedGenre.value || 28),
    popular: selectedPopular.value,
    vote: selectedRating.value,
    year: selectedYear.value,
  })

  return (
    <div className={s.block}>
      {query && (
        <>
          <div>
            <h2>Фильмы: {query.genre || selectedGenre.label}</h2>
          </div>
          <div className={s.selects}>
            <div className={s.firstBlock}>
              <MySelect
                defaultValue={selectedGenre}
                onChange={setSelectedGenre}
                options={genreList}
                value={selectedGenre}
              />
              <MySelect
                defaultValue={selectedRating}
                onChange={setSelectedRating}
                options={rating}
                value={selectedRating}
              />
              <MySelect
                defaultValue={selectedYear}
                onChange={setSelectedYear}
                options={years}
                value={selectedYear}
              />
            </div>
            <div>
              <MySelect
                defaultValue={selectedPopular}
                onChange={setSelectedPopular}
                options={sortBy}
                value={selectedPopular}
              />
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
                  height={300}
                  src={
                    movie.poster_path
                      ? `${process.env.NEXT_PUBLIC_IMAGE_342}${movie.poster_path || movie.backdrop_path}`
                      : ava
                  }
                  width={200}
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
