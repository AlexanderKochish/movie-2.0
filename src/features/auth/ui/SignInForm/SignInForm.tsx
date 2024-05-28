import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { handleLogging } from '@/features/auth/helpers/handleLogging'
import { signInSchema } from '@/features/auth/model/validators/signInSchema'
import { SignInValues } from '@/features/auth/types/auth.types'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { ControlledTextField } from '@/shared/ui/ControlInput/ControlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useSignInWithEmailAndPassword,
  useSignInWithGithub,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth'

import s from './SignInForm.module.scss'

import { auth } from '../../../../../firebase'
import { GitHubIcon, GoogleIcon } from '../../../../../public/icons/icons'

export const SignInForm = () => {
  const [signInWithEmailAndPassword, loggedInUser, loading, error] =
    useSignInWithEmailAndPassword(auth)
  const [signInWithGithub, userGithub, loadGithub, githubError] = useSignInWithGithub(auth)
  const [signInWithGoogle, userGoogle, loadGoogle, googleError] = useSignInWithGoogle(auth)
  const { push } = useRouter()
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
  const onSubmit: SubmitHandler<SignInValues> = async data => {
    if (error) {
      toast.error(error.message)
    } else {
      await signInWithEmailAndPassword(data.email, data.password)
      loggedInUser && toast.success(`Well come ${loggedInUser?.user.displayName}`)
      void push('/')
    }
  }

  return (
    <div className={s.container}>
      <Card asComponent={'form'} className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In</h1>
        <div className={s.socialBlock}>
          <div
            onClick={() =>
              handleLogging({
                error: githubError,
                link: push,
                logging: signInWithGithub,
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
              })
            }
          >
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
