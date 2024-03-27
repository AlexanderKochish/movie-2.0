import { useGetPopularQuery } from '@/features/movies'
import { MovieArgs } from '@/features/movies/types/movies.types'
import { Slider } from '@/widgets/SliderSwiper/Slider'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa6'
import { SwiperSlide } from 'swiper/react'

import s from './NewMovie.module.scss'

type Props = {}

export const NewMovie = (props: Props) => {
  const { data } = useGetPopularQuery()

  return (
    <div className={s.container}>
      <Slider className={s.sliderContainer} slidesPerView={3} spaceBetween={30}>
        {data?.results &&
          data.results?.map((movie: MovieArgs) => (
            <SwiperSlide key={movie.id}>
              {({ isActive }) => (
                <div className={isActive ? `${s.imgWrapper} ${s.active}` : s.imgWrapper}>
                  <Image
                    alt={movie.title}
                    className={s.img}
                    fill
                    src={`${process.env.NEXT_PUBLIC_IMAGE_ORIGIN}${movie.poster_path}`}
                  />
                  <div className={s.info}>
                    <h4>{movie.title || movie.original_title}</h4>
                    <ul className={s.infoRating}>
                      <li>
                        <FaStar className={s.icon} /> {movie.popularity?.toFixed(1)}
                      </li>
                      <li>{movie.release_date?.substring(0, 4)}</li>
                    </ul>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
      </Slider>
    </div>
  )
}
