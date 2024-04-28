import z from 'zod'

export const profileSchema = () =>
  z.object({
    aboutMe: z.string(),
    phone: z.string(),
    username: z.string(),
  })

export type profileSchemaValues = z.infer<ReturnType<typeof profileSchema>>
