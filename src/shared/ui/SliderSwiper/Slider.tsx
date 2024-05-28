import clsx from 'clsx'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperProps } from 'swiper/react'
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
  className?: string
  loop?: boolean
  moduleSlider: SwiperModule
  nav?: boolean
} & SwiperProps

export const Slider = ({
  breakpoints,
  children,
  className,
  loop,
  moduleSlider,
  nav,
  slidesPerView,
  spaceBetween,
}: Props) => {
  return (
    <Swiper
      breakpoints={breakpoints}
      className={clsx('single-slider', className)}
      coverflowEffect={{
        depth: 70,
        modifier: 1,
        rotate: 50,
        slideShadows: true,
        stretch: 0,
      }}
      effect={'coverflow'}
      loop={loop}
      modules={[Navigation, moduleSlider]}
      navigation={nav}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
    >
      {children}
    </Swiper>
  )
}
