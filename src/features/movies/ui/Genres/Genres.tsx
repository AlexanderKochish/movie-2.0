import { useGetGenresQuery } from '@/features/movies/api/movie-api'
import { GenresArgs } from '@/features/movies/types/movies.types'
import { Slider } from '@/shared/ui/SliderSwiper/Slider'
import { useRouter } from 'next/router'
import { A11y } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

import s from './Genres.module.scss'

import { genreList } from '../../breakpoints/breakpoints'

export const Genres = () => {
  const { data } = useGetGenresQuery()
  const { push } = useRouter()

  const handleChoiceGenre = (name: string) => {
    void push(`/movies?genre=${name}`)
  }

  return (
    <ul className={s.block}>
      <Slider
        breakpoints={genreList}
        moduleSlider={A11y}
        nav={false}
        slidesPerView={8.5}
        spaceBetween={5}
      >
        {data &&
          data.genres.map((genre: GenresArgs) => (
            <SwiperSlide key={genre.id}>
              <li className={s.item} key={genre.id} onClick={() => handleChoiceGenre(genre.name)}>
                {genre.name.substring(0, 1).toUpperCase() + genre.name.substring(1)}
              </li>
            </SwiperSlide>
          ))}
      </Slider>
    </ul>
  )
}
