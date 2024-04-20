import { useGetActorByIdQuery, useGetActorMoviesByIdQuery } from '@/features/actors/api/actors-api'
import { MoviesOfGenres } from '@/features/movies/ui/MoviesOfGenre/MoviesOfGenre'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './ActorProfile.module.scss'

import ava from '../../../../../public/avatar-1577909_1280.webp'
export const ActorProfile = () => {
  const { query } = useRouter()
  const { data: actor, isLoading } = useGetActorByIdQuery(Number(query.id))
  const { data } = useGetActorMoviesByIdQuery(Number(query.id), { skip: !actor })

  return (
    <div className={s.container}>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={s.actor}>
          <div className={s.img}>
            <Image
              alt={'actor profile'}
              fill
              src={
                actor?.profile_path
                  ? `${process.env.NEXT_PUBLIC_IMAGE_342}${actor?.profile_path}`
                  : ava
              }
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
      )}
      <div className={s.name}>
        <h3>Movies with: {actor?.name}</h3>
      </div>
      <div>{data?.cast && <MoviesOfGenres data={data?.cast} />}</div>
    </div>
  )
}
