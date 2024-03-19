import { useAuth } from '@/features/auth/api/auth-api'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import Image from 'next/image'

import s from './SignUpForm.module.scss'

export const SignUpForm = () => {
  const { handleSignUp } = useAuth()

  return (
    <Card asComponent={'form'} className={s.form} onSubmit={handleSignUp}>
      <h1>Sign Up</h1>
      <div className={s.socialBlock}>
        <div className={s.icon}></div>
        <div className={s.icon}></div>
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
    </Card>
  )
}
