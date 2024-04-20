import { ReactElement } from 'react'

import { SignInForm } from '@/features/auth/ui/SignInForm/SignInForm'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'

const SignIn: Page = () => {
  return <SignInForm />
}

SignIn.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default SignIn
