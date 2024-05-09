import { MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { MovieCard } from '@/shared/ui/MovieCard/MovieCard'
import { Slider } from '@/widgets/SliderSwiper/Slider'
import { A11y, FreeMode } from 'swiper/modules'
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
      <Slider
        cardClassName={s.card}
        className={s.slider}
        data={data?.results}
        moduleSlider={FreeMode}
        slidesPerView={6}
        spaceBetween={20}
      />
    </ul>
  )
}
