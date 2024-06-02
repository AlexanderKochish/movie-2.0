import { useEffect, useState } from 'react'

import { MovieArgs, MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { Button } from '@/shared/ui/Button/Button'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BsInfoCircle } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'

import s from './NewMovie.module.scss'

type Props = {
  data?: MoviesResponseArgs
}

export const NewMovie = ({ data }: Props) => {
  const [movie, setMovie] = useState<MovieArgs | undefined>(undefined)
  const { push } = useRouter()

  useEffect(() => {
    setMovie(data?.results[Math.floor(Math.random() * data.results.length)])
  }, [data])

  return (
    <>
      {!movie ? (
        <Preloader />
      ) : (
        <article className={s.imgWrapper}>
          <Image
            alt={movie.title || 'poster'}
            fill
            sizes={'100vw'}
            src={`${process.env.NEXT_PUBLIC_IMAGE_ORIGIN}${movie.backdrop_path}`}
            style={{ objectFit: 'cover' }}
          />
          <div className={s.info}>
            {!movie.title && !movie.original_title && <p className={s.infoTitle}>No name</p>}
            <h2 className={s.infoTitle}>{movie.title || movie.original_title}</h2>

            <p className={s.overview}>{movie.overview}</p>
            <div className={s.infoBottom}>
              <div className={s.year}>{movie.release_date?.substring(0, 4) || 'No year'}</div>
              <div className={s.infoRating}>
                <FaStar style={{ color: 'yellow' }} /> {movie.vote_average.toFixed(1)}
              </div>
            </div>

            <div className={s.btns}>
              <Button variant={'primary'}>Watch Trailer</Button>
              <Button
                className={s.favorite}
                onClick={() => push(`/movies/${movie.id}`)}
                variant={'outline'}
              >
                <BsInfoCircle height={40} width={40} />
              </Button>
            </div>
          </div>
        </article>
      )}
    </>
  )
}
