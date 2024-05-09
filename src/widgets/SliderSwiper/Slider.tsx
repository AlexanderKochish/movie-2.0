import { ReactNode } from 'react'

import { MovieArgs } from '@/features/movies/types/movies.types'
import { MovieCard } from '@/shared/ui/MovieCard/MovieCard'
import clsx from 'clsx'
import { A11y, EffectCoverflow, Navigation } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { SwiperModule } from 'swiper/types'

// eslint-disable-next-line import/extensions
import './Slider.scss'
// eslint-disable-next-line import/extensions
import 'swiper/css'
// eslint-disable-next-line import/extensions
import 'swiper/css/effect-coverflow'
// eslint-disable-next-line import/extensions
import 'swiper/css/navigation'

type BreakPoints = {
  [key: string]: {
    slidesPerView: number
    spaceBetween: number
  }
}
type Props = {
  breakpoints?: BreakPoints
  cardClassName: string
  data?: MovieArgs[]
  moduleSlider: SwiperModule
  sizes?: boolean
} & SwiperProps

export const Slider = ({
  breakpoints,
  cardClassName,
  className,
  data,
  moduleSlider,
  sizes,
  slidesPerView,
  spaceBetween,
}: Props) => {
  return (
    <Swiper
      breakpoints={breakpoints}
      centeredSlides
      className={clsx('single-slider', className)}
      coverflowEffect={{
        depth: 100,
        modifier: 1,
        rotate: 50,
        slideShadows: true,
        stretch: 0,
      }}
      effect={'coverflow'}
      loop
      modules={[Navigation, moduleSlider]}
      navigation
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
    >
      {data &&
        data.map(movie => (
          <SwiperSlide key={movie.id}>
            <MovieCard cardClassName={cardClassName} movie={movie} sizes={sizes} />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
