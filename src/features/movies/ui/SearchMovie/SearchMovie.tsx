import { useGetMovieByNameQuery } from '@/features/movies'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import Image from 'next/image'
import Link from 'next/link'

import s from './SearchMovie.module.scss'

type Props = {
  name: string
  onOpen: (open: boolean) => void
  open: boolean
}

export const SearchMovie = ({ name, onOpen, open }: Props) => {
  const { data, isLoading } = useGetMovieByNameQuery(name)

  return (
    <ul className={s.moviesList}>
      {data &&
        data.results.map(movie => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <li onClick={() => onOpen(false)}>
              {movie.poster_path && (
                <div className={s.image}>
                  <Image
                    alt={'poster'}
                    fill
                    src={`${process.env.NEXT_PUBLIC_IMAGE_342}${movie.poster_path || movie.backdrop_path}`}
                  />
                </div>
              )}
            </li>
          </Link>
        ))}
    </ul>
  )
}
