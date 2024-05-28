import { useState } from 'react'

import { useGetActorByIdQuery, useGetActorMoviesByIdQuery } from '@/features/actors/api/actors-api'
import { MovieList } from '@/features/movies/ui/MovieList/MovieList'
import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { MovieCard } from '@/shared/ui/MovieCard/MovieCard'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './ActorProfile.module.scss'

import ava from '../../../../../public/avatar-1577909_1280.webp'

export const ActorProfile = () => {
  const { query } = useRouter()
  const { data: actor, isLoading } = useGetActorByIdQuery(Number(query.id))
  const { data } = useGetActorMoviesByIdQuery(Number(query.id), { skip: !actor })
  const [currentPage, setCurrentPage] = useState(1)

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={s.container}>
      <div className={s.actor}>
        <div className={s.img}>
          <Image
            alt={'actor profile'}
            height={320}
            loading={'lazy'}
            sizes={'(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px'}
            src={
              actor?.profile_path
                ? `${process.env.NEXT_PUBLIC_IMAGE_342}${actor?.profile_path}`
                : ava
            }
            width={300}
          />
        </div>
        <ul className={s.actorInfo}>
          <li>
            <span className={s.item}>Full-name:</span> {actor?.name}
          </li>
          <li>
            <span className={s.item}>Biography:</span> {actor?.biography}
          </li>
          <li>
            <span className={s.item}>Birthday:</span>{' '}
            {actor?.birthday && actor?.birthday.replace(/-/g, '.')}
          </li>
          <li>
            <span className={s.item}>Place of born:</span> {actor?.place_of_birth}
          </li>
        </ul>
      </div>

      <div className={s.name}>
        <h3>Movies with: {actor?.name}</h3>
      </div>
      <ul className={s.list}>
        {data?.cast && data.cast.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </ul>
      {/* <Pagination
        currentPage={currentPage}
        onChangePage={setCurrentPage}
        pageSize={5}
        totalCount={data?.cast.length || 1}
      /> */}
    </div>
  )
}
