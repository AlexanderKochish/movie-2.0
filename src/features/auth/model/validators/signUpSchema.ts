import z from 'zod'

export const signUpSchema = () =>
  z
    .object({
      email: z.string().email(),
      password: z.string().min(4).max(20),
      passwordConfirm: z.string().default(''),
      username: z.string().min(4).max(20),
    })
    .refine(data => data.password === data.passwordConfirm, {
      message: 'Password not match',
      path: ['passwordConfirm'],
    })

export type signUpFormValues = z.infer<ReturnType<typeof signUpSchema>>
