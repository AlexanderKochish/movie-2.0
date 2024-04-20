import { Cast } from '@/features/movies/types/movies.types'
import Image from 'next/image'

import s from './CastItem.module.scss'

import imageAvatar from '../../../../../public/avatar-1577909_1280.webp'

type Props = {
  actor: Cast
}
export const CastItem = ({ actor }: Props) => {
  const img = actor.profile_path
    ? `${process.env.NEXT_PUBLIC_IMAGE_342}${actor.profile_path}`
    : imageAvatar

  return (
    <li>
      <figure className={s.item}>
        <div className={s.img}>
          <Image alt={'actor image'} fill src={img} />
        </div>
        <figcaption className={s.name}>{actor.name.split('')}</figcaption>
      </figure>
    </li>
  )
}
