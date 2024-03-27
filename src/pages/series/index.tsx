import { ReactElement } from 'react'

import { NextPageWithLayout } from '@/pages/_app'
import Layout from '@/widgets/layout/ui/layout'

const Series: NextPageWithLayout = () => {
  return <div>Movies</div>
}

export default Series

Series.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
