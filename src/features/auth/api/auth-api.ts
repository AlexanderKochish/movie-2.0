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
    signInWithEmailAndPassword(auth, email, password).then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result)

      const token = credential?.accessToken

      const user = result.user

      if (token) {
        localStorage.setItem('currentProfile', JSON.stringify(user.providerData))
        router.push('/')
      }
    })
  }
  const enterForSocialMediate = async ({ provider }: any) => {
    if (provider instanceof GoogleAuthProvider) {
      signInWithPopup(auth, provider)
        .then(result => {
          const credential = GoogleAuthProvider.credentialFromResult(result)

          const token = credential?.accessToken

          const user = result.user

          if (token) {
            localStorage.setItem('currentProfile', JSON.stringify(user.providerData))
            router.push('/')
          }
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.customData.email
          const credential = GithubAuthProvider.credentialFromError(error)

          toast.error(errorMessage)
        })
    }

    if (provider instanceof GithubAuthProvider) {
      signInWithPopup(auth, provider)
        .then(result => {
          const credential = GithubAuthProvider.credentialFromResult(result)

          const token = credential?.accessToken

          const user = result.user

          toast.done('Successfully registered user with email and password')
          if (token) {
            localStorage.setItem('currentProfile', JSON.stringify(user.providerData))
            router.push('/')
          }
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.customData.email
          const credential = GithubAuthProvider.credentialFromError(error)

          toast.error(errorMessage)
        })
    }
  }

  const handleSignUp = async ({ email, password }: SigUpProps) => {
    if (!email || !password) {
      toast.error('Place enter email or password')
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential)
        const user = userCredential.user

        toast.done('Successfully registered user with email and password')
      })
      .catch(error => {
        toast.error('🦄 Wow so easy!', {
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: false,
          pauseOnHover: true,
          position: 'bottom-left',
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        })
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  return { enterForSocialMediate, handleSignIn, handleSignUp }
}
