import { useAuth } from '@/features/auth/api/auth-api'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import Link from 'next/link'

import s from './SignUpForm.module.scss'

import { GitHubIcon, GoogleIcon } from '../../../../../public/icons/icons'

export const SignUpForm = () => {
  const { handleSignUp } = useAuth()

  return (
    <Card asComponent={'form'} className={s.form} onSubmit={handleSignUp}>
      <h1>Sign Up</h1>
      <div className={s.socialBlock}>
        <div>
          <GitHubIcon height={34} width={34} />
        </div>
        <div>
          <GoogleIcon height={34} width={34} />
        </div>
      </div>
      <label htmlFor={'username'}>Username</label>
      <input className={s.input} id={'username'} type={'text'} />
      <label htmlFor={'email'}>Email</label>
      <input className={s.input} id={'email'} type={'email'} />
      <label htmlFor={'password'}>Password</label>
      <input className={s.input} id={'password'} type={'password'} />
      <label htmlFor={'passwordConfirm'}>Password confirmation</label>
      <input className={s.input} id={'passwordConfirm'} type={'password'} />
      <Button fullWidth variant={'primary'}>
        Sign Up
      </Button>
      <p className={s.text}>Do you have an account?</p>
      <Button asComponent={Link} className={s.btn} href={'/auth/sign-in'} variant={'text'}>
        Sign In
      </Button>
    </Card>
  )
}
