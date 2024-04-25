import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuth } from '@/features/auth/api/auth-api'
import { signUpSchema } from '@/features/auth/model/validators/signUpSchema'
import { SignUpValues } from '@/features/auth/types/auth.types'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { ControlledTextField } from '@/shared/ui/ControlInput/ControlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import Link from 'next/link'

import s from './SignUpForm.module.scss'

import { GitHubIcon, GoogleIcon } from '../../../../../public/icons/icons'

export const SignUpForm = () => {
  const { enterForSocialMediate, handleSignUp } = useAuth()
  const github = new GithubAuthProvider()
  const google = new GoogleAuthProvider()
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignUpValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signUpSchema()),
  })
  const onSubmit: SubmitHandler<SignUpValues> = data => handleSignUp(data)

  return (
    <Card asComponent={'form'} className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <div className={s.socialBlock}>
        <div onClick={() => enterForSocialMediate(github)}>
          <GitHubIcon height={34} width={34} />
        </div>
        <div onClick={() => enterForSocialMediate(google)}>
          <GoogleIcon height={34} width={34} />
        </div>
      </div>

      <ControlledTextField
        autoComplete={'username'}
        control={control}
        error={errors.username?.message}
        label={'Username'}
        name={'username'}
      />
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
      <ControlledTextField
        autoComplete={'passwordConfirm'}
        control={control}
        error={errors.passwordConfirm?.message}
        label={'Password confirm'}
        name={'passwordConfirm'}
      />
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
