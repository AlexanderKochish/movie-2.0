import { ReactElement } from 'react'

import { wrapper } from '@/app/store/store'
import { getActorById, getActorMoviesById } from '@/features/actors/api/actors-api'
import { ActorProfile } from '@/features/actors/ui/ActorProfile/ActorProfile'
import { getRunningQueriesThunk } from '@/features/movies/api/movie-api'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const actorId = Number(context.query.id)

  store.dispatch(getActorById.initiate(actorId))
  store.dispatch(getActorMoviesById.initiate(actorId))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const Actors: Page = () => {
  return <ActorProfile />
}

Actors.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Actors
