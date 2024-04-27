import { toast } from 'react-toastify'

import { signInProps } from '@/features/auth/types/auth.types'

export const handleLogging = async ({ error, link, logging, userName }: signInProps) => {
  if (error) {
    toast.error(error.message)
  } else {
    await logging()
    userName && toast.success(`Well come ${userName}`)
    link('/')
  }
}
