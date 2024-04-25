import { toast } from 'react-toastify'

import { Button } from '@/shared/ui/Button/Button'
import { signOut } from '@firebase/auth'
import { useRouter } from 'next/router'

import { auth } from '../../../../../firebase'

type Props = {}

export const LogOut = (props: Props) => {
  const router = useRouter()
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success('Done You Log out!')
        router.push('/auth/sign-in')
      })
      .catch(error => {
        // An error happened.
        toast.error(error.message)
      })
  }

  return (
    <Button onClick={handleLogOut} style={{ background: 'var(--danger-500)' }} variant={'primary'}>
      Log Out
    </Button>
  )
}
