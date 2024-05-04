import { MovieArgs, MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { Slider } from '@/widgets/SliderSwiper/Slider'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa6'
import { SwiperSlide } from 'swiper/react'

import s from './NewMovie.module.scss'

type Props = {
  data?: MoviesResponseArgs
}

export const NewMovie = ({ data }: Props) => {
  return (
    <Slider
      breakpoints={{
        340: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 2.2,
          spaceBetween: 30,
        },
      }}
      className={clsx(s['single-slider'], s.sliderContainer)}
      slidesPerView={3}
      spaceBetween={30}
    >
      {data?.results &&
        data.results?.map((movie: MovieArgs) => (
          <SwiperSlide key={movie.id}>
            {({ isActive }) => (
              <Link href={`/movies/${movie.id}`}>
                <div className={isActive ? `${s.imgWrapper} ${s.active}` : s.imgWrapper}>
                  <Image
                    alt={movie.title}
                    className={s.img}
                    fill
                    src={`${process.env.NEXT_PUBLIC_IMAGE_ORIGIN}${movie.poster_path}`}
                  />

                  <div className={s.info}>
                    <h4>{movie.title || movie.original_title}</h4>
                    <ul className={s.infoRating}>
                      <li>
                        <FaStar className={s.icon} /> {movie.vote_average?.toFixed(1)}
                      </li>
                      <li>{movie.release_date?.substring(0, 4)}</li>
                    </ul>
                  </div>
                </div>
              </Link>
            )}
          </SwiperSlide>
        ))}
    </Slider>
  )
}
