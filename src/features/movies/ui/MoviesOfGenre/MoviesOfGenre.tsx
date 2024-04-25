import { useState } from 'react'
import Select from 'react-select'

import { MySelect } from '@/shared/ui/Select/Select'
import Image from 'next/image'
import Link from 'next/link'

import s from './MoviesOfGenre.module.scss'

import ava from '../../../../../public/avatar-1577909_1280.webp'
type Props = {
  data: any
  query?: any
}
const options = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Vanilla', value: 'vanilla' },
]

export const MoviesOfGenres = ({ data, query }: Props) => {
  const [selectedOption, setSelectedOption] = useState<null | string | string[]>('Genre')

  return (
    <div className={s.block}>
      {query && (
        <>
          <div>
            <h2>Фильмы: {query.genre}</h2>
          </div>
          <div className={s.selects}>
            <MySelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            <MySelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            <MySelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </>
      )}

      <ul className={s.list}>
        {data &&
          data.map((movie: any) => (
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
                  <div className={s.cardRating}>{movie.popularity.toFixed(1)}</div>
                  <div className={s.infoFooter}>
                    <div>{movie.title || movie.original_title}</div>
                    <div className={s.year}>{movie.release_date.substring(0, 4)}</div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  )
}
