import { toast } from 'react-toastify'

import { Button } from '@/shared/ui/Button/Button'
import { signOut } from '@firebase/auth'
import { useRouter } from 'next/router'

import { auth } from '../../../../../firebase'

type Props = {}

export const LogOut = (props: Props) => {
  const { push } = useRouter()
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        void push('/auth/sign-in')
        toast.success('Done You Log out!')
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
