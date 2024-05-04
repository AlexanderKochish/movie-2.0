import { ReactNode } from 'react'

import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperProps } from 'swiper/react'

// eslint-disable-next-line import/extensions
// import './Slider.scss'
// eslint-disable-next-line import/extensions
import 'swiper/css'
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
  children: ReactNode
} & SwiperProps

export const Slider = ({
  breakpoints,
  children,
  className,
  slidesPerView,
  spaceBetween,
}: Props) => {
  return (
    <Swiper
      breakpoints={breakpoints}
      centeredSlides
      className={className}
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
