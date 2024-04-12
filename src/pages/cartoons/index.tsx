import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'

const Cartoons: Page = () => {
  return <div>Cartoons</div>
}

export default Cartoons

Cartoons.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
