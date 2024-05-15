import { useState } from 'react'
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share'
import { toast } from 'react-toastify'
import YouTube from 'react-youtube'

import {
  useGetMovieByIdQuery,
  useGetMovieCreditsByIdQuery,
  useGetSimilarMoviesQuery,
  useGetVideoByIdQuery,
} from '@/features/movies/api/movie-api'
import { Cast, Crew } from '@/features/movies/types/movies.types'
import { CastItem } from '@/features/movies/ui/CastItem/CastItem'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import Modal from '@/shared/ui/Modal/Modal'
import { MovieCard } from '@/shared/ui/MovieCard/MovieCard'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { Slider } from '@/shared/ui/SliderSwiper/Slider'
import { CustomTabs } from '@/shared/ui/Tabs/Tabs'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { act } from 'react-dom/test-utils'
import { AiOutlineLink } from 'react-icons/ai'
import { FaRegStar } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa6'
import { GoShareAndroid } from 'react-icons/go'
import { GrFavorite } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'
import { A11y } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

import s from './MovieById.module.scss'

type Props = {
  id: string | string[] | undefined
}
export const MovieById = ({ id }: Props) => {
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useGetMovieByIdQuery(id as string)
  const { data: video, isLoading: isVideoLoad } = useGetVideoByIdQuery(id as string)
  const { data: similar, isLoading: isSimilarLoad } = useGetSimilarMoviesQuery(id as string)
  const { data: credits } = useGetMovieCreditsByIdQuery(id as string)
  const [openShare, setOpenShare] = useState(false)
  const [openRating, setOpenRating] = useState(false)

  function secondsToHMS(seconds: number) {
    const date = new Date(seconds * 1000)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    return `${hours} h ${minutes} min`
  }

  const copyUrlToClipboard = async () => {
    try {
      const url = window.location.href

      await navigator.clipboard.writeText(url)
      toast.success('URL скопирован: ' + url)
    } catch (err) {
      toast.error('Не удалось скопировать URL')
    }
  }

  const opts = {
    height: 400,
    playerVars: {
      autoplay: 0,
    },
    width: 650,
    zIndex: 100,
  }

  if (isLoading) {
    return <Preloader className={s.load} />
  }

  return (
    <>
      {data && (
        <div className={s.block}>
          <div className={s.img}>
            <Image
              alt={'poster'}
              fill
              sizes={'(max-width: 100vh) 100vw, (max-width: 1024px) 50vw, 800px'}
              src={`${process.env.NEXT_PUBLIC_IMAGE_ORIGIN}${data?.backdrop_path || data?.poster_path}`}
            />
            <div className={s.content}>
              <div className={s.container}>
                <div className={s.title}>
                  <h1>{data?.title || data?.original_title}</h1>
                  <ul className={s.titleTop}>
                    <li
                      className={
                        Number(data?.vote_average.toFixed(1)) > 7 ? s.vote : clsx(s.vote, s.min)
                      }
                    >
                      {data?.vote_average.toFixed(1)}
                    </li>
                    <li>{data?.release_date.substring(0, 4)}</li>
                    <li>{data?.status}</li>
                    <li>{data?.production_countries[0]?.name || ''}</li>
                    <li>{secondsToHMS(data?.runtime)}</li>
                  </ul>
                  <p className={s.overview}>{data?.overview || 'No description'}</p>
                  <div className={s.actors}>
                    <span>crew: </span>
                    {credits?.crew.slice(0, 3).map((a: Crew) => <span key={a.name}>{a.name}</span>)}
                  </div>
                  <div className={s.actors}>
                    <span>actors: </span>
                    {credits?.cast.slice(0, 3).map((a: Cast) => <span key={a.name}>{a.name}</span>)}
                  </div>
                  <div className={s.titleBottom}>
                    <Button onClick={() => setOpen(true)} variant={'primary'}>
                      Watch video
                    </Button>

                    <Button className={s.favorite} variant={'outline'}>
                      <GrFavorite />
                    </Button>

                    <Button
                      className={s.favorite}
                      onClick={() => setOpenRating(true)}
                      variant={'outline'}
                    >
                      <FaRegStar />
                    </Button>

                    <Button
                      className={s.favorite}
                      onClick={() => setOpenShare(true)}
                      variant={'outline'}
                    >
                      <GoShareAndroid />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.container}>
            <CustomTabs
              tabs={[
                {
                  content: <p className={s.tabsOverview}>{data?.overview || 'No description'}</p>,
                  label: 'Description',
                },
                {
                  content:
                    (
                      <Slider
                        className={s.similarWrapper}
                        moduleSlider={A11y}
                        nav
                        slidesPerView={7}
                        spaceBetween={10}
                      >
                        {!similar?.results.length
                          ? 'No recommendations'
                          : similar.results.map(movie => (
                              <SwiperSlide className={s.cardS} key={movie.id}>
                                <MovieCard movie={movie} />
                              </SwiperSlide>
                            ))}
                      </Slider>
                    ) || '',
                  label: 'Recommendations',
                },
              ]}
            />
            <h2>Actors and creators</h2>
            <ul>
              <Slider
                className={s.castList}
                loop={false}
                moduleSlider={A11y}
                slidesPerView={9}
                spaceBetween={10}
              >
                {credits?.cast &&
                  credits.cast.map(actor => (
                    <SwiperSlide className={s.item} key={actor.id}>
                      <Link href={`/actors/${actor.id}`}>
                        <CastItem actor={actor} />
                      </Link>
                    </SwiperSlide>
                  ))}
              </Slider>
            </ul>
          </div>
        </div>
      )}
      <Modal btn className={s.modalContent} disabled={false} onClose={setOpen} open={open}>
        <div onClick={() => setOpen(false)}>
          {!video?.results.length ? (
            <Card className={s.videoNotification}>No video trailer</Card>
          ) : (
            <YouTube opts={opts} videoId={video?.results[0]?.key || video?.results[1]?.key} />
          )}
        </div>
      </Modal>
      <Modal className={s.modalOverlay} disabled={false} onClose={setOpenShare} open={openShare}>
        <div className={s.share}>
          <div className={s.shareTitle}>
            <h2>Share</h2>
            <button aria-label={'Close'} className={s.closeBtn} onClick={() => setOpenShare(false)}>
              <IoMdClose className={s.closeIcon} />
            </button>
          </div>
          <div className={s.shareIcons}>
            <EmailShareButton url={`http://localhost:3000/movies/${id}`}>
              <EmailIcon round />
            </EmailShareButton>
            <LinkedinShareButton url={`http://localhost:3000/movies/${id}`}>
              <LinkedinIcon round />
            </LinkedinShareButton>
            <TelegramShareButton url={`http://localhost:3000/movies/${id}`}>
              <TelegramIcon round />
            </TelegramShareButton>
            <TwitterShareButton url={`http://localhost:3000/movies/${id}`}>
              <TwitterIcon round />
            </TwitterShareButton>
            <ViberShareButton url={`http://localhost:3000/movies/${id}`}>
              <ViberIcon round />
            </ViberShareButton>
            <WhatsappShareButton url={`http://localhost:3000/movies/${id}`}>
              <WhatsappIcon round />
            </WhatsappShareButton>
          </div>
          <Button className={s.blockCopyLink} onClick={copyUrlToClipboard} variant={'text'}>
            <AiOutlineLink className={s.shareBtn} />
            <p>Copy link</p>
          </Button>
        </div>
      </Modal>
      <Modal className={s.modalOverlay} disabled={false} onClose={setOpenRating} open={openRating}>
        <div className={s.share}>
          {' '}
          <div className={s.blockCloseBtn}>
            <button
              aria-label={'Close'}
              className={s.closeBtn}
              onClick={() => setOpenRating(false)}
            >
              <IoMdClose className={s.closeIcon} />
            </button>
          </div>
          <h2 className={s.ratingTitle}>Please rate from 1 to 10</h2>
          <div className={s.ratingBlock}>
            <div className={s.starsBlock}>
              {Array.from({ length: 10 }, (_, i) => (
                <FaStar className={s.star} key={i} />
              ))}
            </div>
            <Button variant={'primary'}>Give a rating</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
