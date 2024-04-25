export type SignUpValues = {
  email: string
  password: string
  passwordConfirm: string
  username: string
}

export type SignInValues = Omit<SignUpValues, 'passwordConfirm' | 'username'>
