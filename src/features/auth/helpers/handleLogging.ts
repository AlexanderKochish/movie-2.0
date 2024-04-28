import { toast } from 'react-toastify'

import { signInProps } from '@/features/auth/types/auth.types'
import { doc, setDoc } from '@firebase/firestore'

import { db } from '../../../../firebase'

export const handleLogging = async ({ error, link, logging }: signInProps) => {
  if (error) {
    toast.error(error.message)
  }
  const user = await logging()

  if (user) {
    await setDoc(doc(db, 'users', user.user.uid), {
      email: user.user.email,
      name: user.user.displayName,
    })

    toast.success('User registered successfully')
    void link('/')
  }
}
