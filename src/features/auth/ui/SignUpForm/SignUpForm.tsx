import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAuth } from '@/features/auth/api/auth-api'
import { signUpSchema } from '@/features/auth/model/validators/signUpSchema'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { ControlledTextField } from '@/shared/ui/ControlInput/ControlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './SignUpForm.module.scss'

import { GitHubIcon, GoogleIcon } from '../../../../../public/icons/icons'
import onChange = toast.onChange

interface ISignUpForm {
  email: string
  password: string
  passwordConfirm: string
  username: string
}
export const SignUpForm = () => {
  const { handleSignUp } = useAuth()
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ISignUpForm>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signUpSchema()),
  })
  const onSubmit: SubmitHandler<ISignUpForm> = data => console.log(data)

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
