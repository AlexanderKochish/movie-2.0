import { ReactNode } from 'react'

import clsx from 'clsx'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperProps } from 'swiper/react'

// eslint-disable-next-line import/extensions
import './Slider.scss'
// eslint-disable-next-line import/extensions
import 'swiper/css'
// eslint-disable-next-line import/extensions
import 'swiper/css/navigation'

type Props = {
  children: ReactNode
} & SwiperProps

export const Slider = ({ children, className, slidesPerView, spaceBetween }: Props) => {
  return (
    <Swiper
      centeredSlides
      className={clsx('single-slider', className)}
      effect={'slide'}
      loop
      modules={[Navigation, A11y]}
      navigation
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={swiper => console.log(swiper)}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
    >
      {children}
    </Swiper>
  )
}
