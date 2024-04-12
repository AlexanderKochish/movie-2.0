import { useGetGenresQuery, useGetMoviesOfGenresQuery } from '@/features/movies/api/movie-api'
import { Select } from '@/shared/ui/Select/Select'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './MoviesOfGenre.module.scss'

type Props = {}

export const MoviesOfGenres = (props: Props) => {
  const { data: genres } = useGetGenresQuery()
  const { query } = useRouter()
  const gen = query.genre && genres?.genres.find((el: any) => el.name === query.genre)
  const { data } = useGetMoviesOfGenresQuery(gen?.id.toString() || '12')

  return (
    <div className={s.block}>
      <div>
        <h2>Фильмы: {query.genre}</h2>
      </div>
      <div className={s.selects}>
        <Select />
      </div>
      <ul className={s.list}>
        {data &&
          data.results.map(movie => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <li className={s.card}>
                <Image
                  alt={movie.title || 'poster'}
                  className={s.img}
                  height={300}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_342}${movie.poster_path}`}
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
