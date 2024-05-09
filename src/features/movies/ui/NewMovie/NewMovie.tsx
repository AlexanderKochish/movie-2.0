import { MovieArgs, MoviesResponseArgs } from '@/features/movies/types/movies.types'
import { Slider } from '@/widgets/SliderSwiper/Slider'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa6'
import { EffectCoverflow } from 'swiper/modules'
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
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      cardClassName={s.imgWrapper}
      className={clsx(s['single-slider'], s.sliderContainer)}
      data={data?.results}
      moduleSlider={EffectCoverflow}
      sizes
      slidesPerView={3}
      spaceBetween={30}
    />
  )
}
