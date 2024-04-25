import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuth } from '@/features/auth/api/auth-api'
import { signInSchema } from '@/features/auth/model/validators/signInSchema'
import { SignInValues } from '@/features/auth/types/auth.types'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { ControlledTextField } from '@/shared/ui/ControlInput/ControlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import Link from 'next/link'

import s from './SignInForm.module.scss'

import { GitHubIcon, GoogleIcon } from '../../../../../public/icons/icons'

export const SignInForm = () => {
  const { enterForSocialMediate, handleSignIn } = useAuth()
  const github = new GithubAuthProvider()
  const google = new GoogleAuthProvider()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signInSchema()),
  })
  const onSubmit: SubmitHandler<SignInValues> = data => handleSignIn(data)

  return (
    <div className={s.container}>
      <Card asComponent={'form'} className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In</h1>
        <div className={s.socialBlock}>
          <div onClick={() => enterForSocialMediate(github)}>
            <GitHubIcon height={34} width={34} />
          </div>
          <div onClick={() => enterForSocialMediate(google)}>
            <GoogleIcon height={34} width={34} />
          </div>
        </div>
        <ControlledTextField
          autoComplete={'email'}
          control={control}
          error={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <ControlledTextField
          autoComplete={'password'}
          control={control}
          error={errors.password?.message}
          label={'Password'}
          name={'password'}
        />
        <Button variant={'primary'}>Sign In</Button>
        <p className={s.text}>Don’t have an account?</p>
        <Button asComponent={Link} className={s.btn} href={'/auth/sign-up'} variant={'text'}>
          Sign Up
        </Button>
      </Card>
    </div>
  )
}
