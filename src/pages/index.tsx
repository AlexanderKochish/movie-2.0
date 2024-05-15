import { wrapper } from '@/app/store/store'
import {
  getComedy,
  getFamily,
  getFantasy,
  getGenres,
  getNowPlaying,
  getPopular,
  getRunningQueriesThunk,
  getTopRating,
  getUpComing,
  useGetComedyQuery,
  useGetFamilyQuery,
  useGetFantasyQuery,
  useGetNowPlayingQuery,
  useGetPopularQuery,
  useGetUpComingQuery,
} from '@/features/movies/api/movie-api'
import { Genres } from '@/features/movies/ui/Genres/Genres'
import { MainText } from '@/features/movies/ui/MainText/MainText'
import { MovieList } from '@/features/movies/ui/MovieList/MovieList'
import { NewMovie } from '@/features/movies/ui/NewMovie/NewMovie'
import { Page } from '@/shared/types/layout'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import Layout from '@/widgets/layout/ui/layout'
import { Meta } from '@/widgets/meta/Meta'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  store.dispatch(getPopular.initiate())
  store.dispatch(getGenres.initiate())
  store.dispatch(getTopRating.initiate())
  store.dispatch(getNowPlaying.initiate())
  store.dispatch(getUpComing.initiate())
  store.dispatch(getComedy.initiate())
  store.dispatch(getFamily.initiate())
  store.dispatch(getFantasy.initiate())

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const Home: Page = () => {
  const { data: fantasy } = useGetFantasyQuery()
  const { data: nowPlaying } = useGetNowPlayingQuery()
  const { data: upComing } = useGetUpComingQuery()
  const { data: comedy } = useGetComedyQuery()
  const { data: family, isLoading: isListLoad } = useGetFamilyQuery()
  const { data: popular, isLoading: isPopularLoad } = useGetPopularQuery()

  return (
    <>
      <Meta content={'Generated by create next app'} name={'description'} />
      {isPopularLoad ? <Preloader /> : <NewMovie data={popular} />}
      <Genres />
      {isListLoad ? (
        <Preloader />
      ) : (
        <>
          <MovieList data={comedy?.results} title={'Комедийные фильмы'} />
          <MovieList data={nowPlaying?.results} title={'Новые фильмы'} />
          <MovieList data={family?.results} title={'Смотрим всей семьей'} />
          <MovieList data={upComing?.results} title={'Скоро выйдут'} />
          <MovieList data={fantasy?.results} title={'Фантастика'} />
          <MainText />
        </>
      )}
    </>
  )
}

Home.getLayout = page => <Layout>{page}</Layout>

export default Home
