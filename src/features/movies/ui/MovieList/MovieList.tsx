import { MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { MovieCard } from '@/shared/ui/MovieCard/MovieCard'
import { Slider } from '@/widgets/SliderSwiper/Slider'
import { SwiperSlide } from 'swiper/react'

import s from './MovieList.module.scss'

type Props = {
  data?: MoviesResponseArgs
  title?: string
}

export const MovieList = ({ data, title }: Props) => {
  return (
    <ul className={s.block}>
      <h3>{title}</h3>
      <Slider className={s.sliderContainer} slidesPerView={7} spaceBetween={30}>
        {data &&
          data.results.map(movie => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
      </Slider>
    </ul>
  )
}
