import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'

export const Profile: Page = () => {
  return <div>Profile</div>
}

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Profile
