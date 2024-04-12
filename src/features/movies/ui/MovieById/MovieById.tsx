import { useState } from 'react'
import YouTube from 'react-youtube'

import {
  useGetMovieByIdQuery,
  useGetMovieCreditsByIdQuery,
  useGetVideoByIdQuery,
} from '@/features/movies/api/movie-api'
import { Cast, Crew } from '@/features/movies/types/movies.types'
import { CastItem } from '@/features/movies/ui/CastItem/CastItem'
import { Button } from '@/shared/ui/Button/Button'
import Modal from '@/shared/ui/Modal/Modal'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { Slider } from '@/widgets/SliderSwiper/Slider'
import Image from 'next/image'
import { FaRegStar } from 'react-icons/fa'
import { GoShareAndroid } from 'react-icons/go'
import { GrFavorite } from 'react-icons/gr'
import { SwiperSlide } from 'swiper/react'

import s from './MovieById.module.scss'

type Props = {
  id: string | string[] | undefined
}
export const MovieById = ({ id }: Props) => {
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useGetMovieByIdQuery(id as string)
  const { data: video, isLoading: isVideoLoad } = useGetVideoByIdQuery(id as string)
  const { data: credits } = useGetMovieCreditsByIdQuery(id as string)

  function secondsToHMS(seconds: number) {
    const date = new Date(seconds * 1000)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    return `${hours} h ${minutes} min`
  }

  const opts = {
    height: 400,
    playerVars: {
      autoplay: 0,
    },
    width: 650,
    zIndex: 100,
  }

  return (
    <>
      {isLoading ? (
        <Preloader className={s.load} />
      ) : (
        data && (
          <div className={s.block}>
            <div className={s.img}>
              <Image
                alt={'poster'}
                fill
                src={`${process.env.NEXT_PUBLIC_IMAGE_ORIGIN}${data?.backdrop_path || data?.poster_path}`}
              />
              <div className={s.content}>
                <div className={s.container}>
                  <div className={s.title}>
                    <h1>{data?.title || data?.original_title}</h1>
                    <ul className={s.titleTop}>
                      <li>{data?.vote_average.toFixed(1)}</li>
                      <li>{data?.release_date.substring(0, 4)}</li>
                      <li>{secondsToHMS(data?.runtime)}</li>
                    </ul>
                    <div className={s.actors}>
                      <span>crew: </span>
                      {credits?.crew
                        .slice(0, 3)
                        .map((a: Crew) => <span key={a.name}>{a.name}</span>)}
                    </div>
                    <div className={s.actors}>
                      <span>actors: </span>
                      {credits?.cast
                        .slice(0, 3)
                        .map((a: Cast) => <span key={a.name}>{a.name}</span>)}
                    </div>
                    <p>{data?.overview}</p>
                    <ul className={s.titleBottom}>
                      <li>
                        <Button onClick={() => setOpen(true)} variant={'primary'}>
                          Watch video
                        </Button>
                      </li>
                      <li>
                        <Button className={s.favorite} variant={'outline'}>
                          <GrFavorite />
                        </Button>
                      </li>
                      <li>
                        <Button className={s.favorite} variant={'outline'}>
                          <FaRegStar />
                        </Button>
                      </li>
                      <li>
                        <Button className={s.favorite} variant={'outline'}>
                          <GoShareAndroid />
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <ul>
              <Slider className={s.castList} slidesPerView={9} spaceBetween={30}>
                {credits?.cast &&
                  credits.cast.map(actor => (
                    <SwiperSlide key={actor.id}>
                      <CastItem actor={actor} />
                    </SwiperSlide>
                  ))}
              </Slider>
            </ul>
          </div>
        )
      )}
      <Modal className={s.blockYoutube} disabled={false} onClose={setOpen} open={open}>
        {isVideoLoad ? (
          <div>Loading...</div>
        ) : (
          <div onClick={() => setOpen(false)}>
            <YouTube
              loading={'lazy'}
              opts={opts}
              videoId={video?.results[0].key || video?.results[1].key}
            />
          </div>
        )}
      </Modal>
    </>
  )
}
