import { ReactElement } from 'react'

import { SignUpForm } from '@/features/auth/ui/SignUpForm/SignUpForm'
import { NextPageWithLayout } from '@/pages/_app'
import Layout from '@/widgets/layout/ui/layout'

import s from './SignUpPage.module.scss'

const SignUp: NextPageWithLayout = () => {
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
