import { AuthError, UserCredential } from '@firebase/auth'

export type SignUpValues = {
  email: string
  password: string
  passwordConfirm: string
  username: string
}

export type SignInValues = Omit<SignUpValues, 'passwordConfirm' | 'username'>
export type signInProps = {
  error?: AuthError | undefined
  link: (url: string) => void
  signIn: () => Promise<UserCredential | undefined>
  userName: null | string | undefined
}
