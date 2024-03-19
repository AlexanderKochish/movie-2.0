import { useAuth } from '@/features/auth/api/auth-api'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'

import s from '@/features/auth/ui/SignUpForm/SignUpForm.module.scss'

export const SignInForm = () => {
  const { handleSignIn } = useAuth()

  return (
    <Card asComponent={'form'} className={s.form}>
      <h1 onClick={handleSignIn}>Sign In</h1>
      <input className={s.input} placeholder={'Your email'} type={'email'} />
      <input className={s.input} placeholder={'Your password'} type={'password'} />
      <Button variant={'primary'}>Sign In</Button>
    </Card>
  )
}
