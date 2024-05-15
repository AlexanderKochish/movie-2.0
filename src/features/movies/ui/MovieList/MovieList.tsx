import { MovieArgs, MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { MovieCard } from '@/shared/ui/MovieCard/MovieCard'
import { Slider } from '@/shared/ui/SliderSwiper/Slider'
import { A11y, FreeMode } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

import s from './MovieList.module.scss'

type Props = {
  data: MovieArgs[] | undefined
  title?: string
}

export const MovieList = ({ data, title }: Props) => {
  return (
    <ul className={s.block}>
      <h3>{title}</h3>
      <Slider
        breakpoints={{
          140: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          440: { slidesPerView: 2, spaceBetween: 10 },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          780: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          920: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1400: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        }}
        className={s.slider}
        moduleSlider={FreeMode}
        nav
        slidesPerView={6}
        spaceBetween={20}
      >
        {data &&
          data.map((movie: MovieArgs) => (
            <SwiperSlide className={s.card} key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
      </Slider>
    </ul>
  )
}
