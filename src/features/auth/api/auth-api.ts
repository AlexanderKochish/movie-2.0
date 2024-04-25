import { FormEvent } from 'react'
import { Bounce, toast } from 'react-toastify'

import { createUserWithEmailAndPassword } from '@firebase/auth'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'

import { auth } from '../../../../firebase'

export const useAuth = () => {
  const router = useRouter()

  const handleSignIn = async (provider: any) => {
    if (provider instanceof GoogleAuthProvider) {
      signInWithPopup(auth, provider)
        .then(result => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          // @ts-ignore
          const token = credential.accessToken

          const user = result.user

          if (token) {
            toast('🦄 Wow so easy!', {
              autoClose: 5000,
              closeOnClick: true,
              draggable: true,
              hideProgressBar: false,
              pauseOnHover: true,
              position: 'top-right',
              progress: undefined,
              theme: 'light',
              transition: Bounce,
            })
            localStorage.setItem('currentProfile', JSON.stringify(user.providerData))
            router.push('/')
          }
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
          const email = error.customData.email
          const credential = GithubAuthProvider.credentialFromError(error)

          toast.error(errorMessage)
        })
    }

    if (provider instanceof GithubAuthProvider) {
      signInWithPopup(auth, provider)
        .then(result => {
          const credential = GithubAuthProvider.credentialFromResult(result)
          // @ts-ignore
          const token = credential.accessToken

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

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // @ts-ignore
    const email = e.target[1].value
    // @ts-ignore
    const password = e.target[2].value

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

  return { handleSignIn, handleSignUp }
}
