import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'

const Series: Page = () => {
  return <div>Movies</div>
}

export default Series

Series.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
