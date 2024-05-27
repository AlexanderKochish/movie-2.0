import { MovieArgs, MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { MovieCard } from '@/shared/ui/MovieCard/MovieCard'
import { Slider } from '@/shared/ui/SliderSwiper/Slider'
import { A11y, FreeMode } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

import s from './MovieList.module.scss'

import { movieList } from '../../breakpoints/breakpoints'

type Props = {
  data: MovieArgs[] | undefined
  title?: string
}

export const MovieList = ({ data, title }: Props) => {
  return (
    <ul className={s.block}>
      <h3>{title}</h3>
      <Slider
        breakpoints={movieList}
        className={s.slider}
        moduleSlider={FreeMode}
        nav
        slidesPerView={6}
        spaceBetween={20}
      >
        {data &&
          data.map((movie: MovieArgs) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
      </Slider>
    </ul>
  )
}
