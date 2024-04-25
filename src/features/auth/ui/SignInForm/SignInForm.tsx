import { Bounce, toast } from 'react-toastify'

import { useAuth } from '@/features/auth/api/auth-api'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import Link from 'next/link'

import s from '@/features/auth/ui/SignUpForm/SignUpForm.module.scss'

import { GitHubIcon, GoogleIcon } from '../../../../../public/icons/icons'

export const SignInForm = () => {
  const { handleSignIn } = useAuth()
  const github = new GithubAuthProvider()
  const google = new GoogleAuthProvider()

  const hand = () => {
    toast('🦄 Wow so easy!', {
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: 'top-right',
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })
  }

  return (
    <div className={s.container}>
      <Card asComponent={'form'} className={s.form} onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <div className={s.socialBlock}>
          <div onClick={() => handleSignIn(github)}>
            <GitHubIcon height={34} width={34} />
          </div>
          <div onClick={() => handleSignIn(google)}>
            <GoogleIcon height={34} width={34} />
          </div>
        </div>
        <label htmlFor={'email'}>Email</label>
        <input className={s.input} id={'email'} type={'email'} />
        <label htmlFor={'password'}>Password</label>
        <input className={s.input} id={'password'} type={'password'} />
        <Button variant={'primary'}>Sign In</Button>
        <p className={s.text}>Don’t have an account?</p>
        <Button
          // asComponent={Link}
          className={s.btn}
          // href={'/auth/sign-up'}
          onClick={hand}
          variant={'text'}
        >
          Sign Up
        </Button>
      </Card>
    </div>
  )
}
