import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuth } from '@/features/auth/api/auth-api'
import { handleLogging } from '@/features/auth/helpers/handleLogging'
import { signUpSchema } from '@/features/auth/model/validators/signUpSchema'
import { SignUpValues } from '@/features/auth/types/auth.types'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { ControlledTextField } from '@/shared/ui/ControlInput/ControlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth'

import s from './SignUpForm.module.scss'

import { auth } from '../../../../../firebase'
import { GitHubIcon, GoogleIcon } from '../../../../../public/icons/icons'

export const SignUpForm = () => {
  const { handleSignUp } = useAuth()
  const [signInWithGithub, userGithub, loadGithub, githubError] = useSignInWithGithub(auth)
  const [signInWithGoogle, userGoogle, loadGoogle, googleError] = useSignInWithGoogle(auth)
  const { push } = useRouter()
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
        <div
          onClick={() =>
            handleLogging({
              error: githubError,
              link: push,
              logging: signInWithGithub,
              userName: userGithub?.user.displayName,
            })
          }
        >
          <GitHubIcon height={34} width={34} />
        </div>
        <div
          onClick={() =>
            handleLogging({
              error: googleError,
              link: push,
              logging: signInWithGoogle,
              userName: userGoogle?.user.displayName,
            })
          }
        >
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
