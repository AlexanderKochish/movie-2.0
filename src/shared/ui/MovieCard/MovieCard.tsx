import { MovieArgs } from '@/features/movies/types/movies.types'
import Image from 'next/image'
import Link from 'next/link'

import s from './MovieCard.module.scss'

type Props = {
  movie: MovieArgs
}
export const MovieCard = ({ movie }: Props) => {
  return (
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
  )
}
