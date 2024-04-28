import { ReactElement } from 'react'

import { Profile } from '@/features/profile/ui/Profile/Profile'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'

export const ProfilePage: Page = () => {
  return <Profile />
}

ProfilePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ProfilePage
