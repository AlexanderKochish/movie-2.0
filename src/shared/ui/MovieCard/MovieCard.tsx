import { MovieArgs } from '@/features/movies/types/movies.types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './MovieCard.module.scss'

import avatar from '../../../../public/avatar-1577909_1280.webp'

type Props = {
  movie: MovieArgs
  pathname: string
}

export const MovieCard = ({ movie, pathname }: Props) => {
  return (
    <Link href={`/${pathname}/${movie.id}`} key={movie.id}>
      <li className={s.card}>
        <Image
          alt={movie.title || 'poster'}
          className={s.img}
          fill
          loading={'lazy'}
          sizes={'100vw'}
          src={
            !movie.poster_path
              ? avatar
              : `${process.env.NEXT_PUBLIC_IMAGE_342}${movie.poster_path || movie.backdrop_path}`
          }
        />
        <div className={s.cardInfo}>
          <div className={s.cardRating}>{movie.vote_average.toFixed(1)}</div>
          <div className={s.infoFooter}>
            <div>{movie.title || movie.original_title}</div>
            <div className={s.year}>{movie.release_date?.substring(0, 4)}</div>
          </div>
        </div>
      </li>
    </Link>
  )
}
