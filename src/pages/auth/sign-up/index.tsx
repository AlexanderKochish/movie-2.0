import { ReactElement } from 'react'

import { SignUpForm } from '@/features/auth/ui/SignUpForm/SignUpForm'
import { Page } from '@/shared/types/layout'
import Layout from '@/widgets/layout/ui/layout'

import s from './SignUpPage.module.scss'

const SignUp: Page = () => {
  return (
    <section className={s.signup}>
      <SignUpForm />
    </section>
  )
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default SignUp
