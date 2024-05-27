import { MovieArgs, MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { Slider } from '@/shared/ui/SliderSwiper/Slider'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { EffectCoverflow } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

import s from './NewMovie.module.scss'

import { titleMovie } from '../../breakpoints/breakpoints'

type Props = {
  data?: MoviesResponseArgs
}

export const NewMovie = ({ data }: Props) => {
  return (
    <Slider
      breakpoints={titleMovie}
      className={clsx(s['single-slider'], s.sliderContainer)}
      loop
      moduleSlider={EffectCoverflow}
      nav
      slidesPerView={3}
      spaceBetween={30}
    >
      {data &&
        data.results.map((movie: MovieArgs) => (
          <SwiperSlide key={movie.id}>
            {({ isActive }) => (
              <Link href={`/movies/${movie.id}`}>
                <li className={s.imgWrapper}>
                  <Image
                    alt={movie.title || 'poster'}
                    className={s.img}
                    fill
                    src={`${process.env.NEXT_PUBLIC_IMAGE_ORIGIN}${movie.poster_path}`}
                  />
                  <div className={isActive ? s.info : clsx(s.info, s.active)}>
                    <div className={s.infoRating}>{movie.vote_average.toFixed(1)}</div>
                    <div>{movie.title || movie.original_title}</div>
                    <div className={s.year}>{movie.release_date?.substring(0, 4)}</div>
                  </div>
                </li>
              </Link>
            )}
          </SwiperSlide>
        ))}
    </Slider>
  )
}
