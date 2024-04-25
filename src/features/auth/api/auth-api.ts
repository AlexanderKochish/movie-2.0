import { Bounce, toast } from 'react-toastify'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'

import { auth } from '../../../../firebase'

type SigUpProps = {
  email: string
  password: string
  passwordConfirm: string
  username: string
}

type SignInProps = Omit<SigUpProps, 'passwordConfirm' | 'username'>

export const useAuth = () => {
  const router = useRouter()

  const handleSignIn = async ({ email, password }: SignInProps) => {
    await signInWithEmailAndPassword(auth, email, password).then(result => {
      const credential = result.user

      const token = credential.refreshToken

      const user = result.user

      if (token && user) {
        toast.success(`Well come ${user.displayName || user.email}`)
        localStorage.setItem('currentProfile', JSON.stringify(user.providerData))
        router.push('/')
      }
    })
  }
  const enterForSocialMediate = async (provider: any) => {
    if (provider instanceof GoogleAuthProvider) {
      signInWithPopup(auth, provider)
        .then(result => {
          const credential = GoogleAuthProvider.credentialFromResult(result)

          const token = credential?.accessToken

          const user = result.user

          toast.success(`Well come ${user.displayName}`)
          if (token && user) {
            localStorage.setItem('currentProfile', JSON.stringify(user.providerData))
            router.push('/')
          }
        })
        .catch(error => {
          const errorCode = error.code
          const email = error.customData.email
          const credential = GithubAuthProvider.credentialFromError(error)

          toast.error(error.message)
        })
    }

    if (provider instanceof GithubAuthProvider) {
      signInWithPopup(auth, provider)
        .then(result => {
          const credential = GithubAuthProvider.credentialFromResult(result)

          const token = credential?.accessToken

          const user = result.user

          toast.success(`Well come ${user.displayName}`)
          if (token && user) {
            localStorage.setItem('currentProfile', JSON.stringify(user.providerData))
            router.push('/')
          }
        })
        .catch(error => {
          const errorCode = error.code
          const email = error.customData.email
          const credential = GithubAuthProvider.credentialFromError(error)

          toast.error(error.message)
        })
    }
  }

  const handleSignUp = async ({ email, password }: SigUpProps) => {
    if (!email || !password) {
      toast.error('Place enter email or password')
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user

        if (user) {
          localStorage.setItem('currentProfile', JSON.stringify(user.providerData))
          router.push('/')
        }
        toast.success(`Well come ${user.displayName}`)
      })
      .catch(error => {
        toast.error(error.message)
        const errorCode = error.code
      })
  }

  return { enterForSocialMediate, handleSignIn, handleSignUp }
}
