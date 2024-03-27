import { useGetGenresQuery } from '@/features/movies/api/movie-api'
import { GenresArgs } from '@/features/movies/types/movies.types'
import { useRouter } from 'next/router'

import s from './Genres.module.scss'

type Props = {}
export const Genres = (props: Props) => {
  const { data } = useGetGenresQuery()
  const router = useRouter()

  const handleChoiceGenre = (name: string) => {
    router.push(`/movies?genre=${name}`)
  }

  return (
    <ul className={s.block}>
      {data &&
        data.genres.map((genre: GenresArgs) => (
          <li className={s.item} key={genre.id} onClick={() => handleChoiceGenre(genre.name)}>
            {genre.name.substring(0, 1).toUpperCase() + genre.name.substring(1)}
          </li>
        ))}
    </ul>
  )
}
