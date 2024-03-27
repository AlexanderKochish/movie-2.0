import { ReactElement } from 'react'

import { NextPageWithLayout } from '@/pages/_app'
import Layout from '@/widgets/layout/ui/layout'

const Cartoons: NextPageWithLayout = () => {
  return <div>Cartoons</div>
}

export default Cartoons

Cartoons.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
