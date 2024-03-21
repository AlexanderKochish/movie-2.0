import { ReactNode } from 'react'

import { A11y, Navigation } from 'swiper/modules'
import { Swiper } from 'swiper/react'

import './Slider.module.scss'
// eslint-disable-next-line import/extensions
import 'swiper/css'
// eslint-disable-next-line import/extensions
import 'swiper/css/navigation'
// eslint-disable-next-line import/extensions
import 'swiper/css/pagination'
// eslint-disable-next-line import/extensions
import 'swiper/css/scrollbar'
// eslint-disable-next-line import/extensions
import 'swiper/css/effect-cube'

type Props = {
  children: ReactNode
  className?: string
  slidesPerView: number
  spaceBetween: number
}
export const Slider = ({ children, className, slidesPerView, spaceBetween }: Props) => {
  return (
    <Swiper
      centeredSlides
      className={className}
      effect={'slide'}
      modules={[Navigation, A11y]}
      navigation
      onSlideChange={() => console.log('slide change')}
      onSwiper={swiper => console.log(swiper)}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
    >
      {children}
    </Swiper>
  )
}
