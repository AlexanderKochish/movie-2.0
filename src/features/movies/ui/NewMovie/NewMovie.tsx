import { useEffect, useState } from 'react'

import { MovieArgs, MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'

import s from './NewMovie.module.scss'

type Props = {
  data?: MoviesResponseArgs
}

export const NewMovie = ({ data }: Props) => {
  const [movie, setMovie] = useState<MovieArgs | undefined>(undefined)

  useEffect(() => {
    setMovie(data?.results[Math.floor(Math.random() * data.results.length)])
  }, [data])

  return (
    <>
      {!movie ? (
        <Preloader />
      ) : (
        <Link href={`/movies/${movie.id}`}>
          <li className={s.imgWrapper}>
            <Image
              alt={movie.title || 'poster'}
              fill
              sizes={'100vw'}
              src={`${process.env.NEXT_PUBLIC_IMAGE_ORIGIN}${movie.backdrop_path}`}
              style={{ objectFit: 'cover' }}
            />
            <div className={s.info}>
              <div className={s.blockInfo}>
                <div className={s.infoTitle}>{movie.title || movie.original_title}</div>
                <p>{movie.overview}</p>
                <div>
                  <div>{movie.genre_ids.join(' | ')}</div>
                  <div className={s.infoRating}>
                    <FaStar /> {movie.vote_average.toFixed(1)}
                  </div>
                </div>
                <div className={s.year}>{movie.release_date?.substring(0, 4)}</div>
              </div>
            </div>
          </li>
        </Link>
      )}
    </>
  )
}
