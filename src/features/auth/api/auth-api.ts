import { FormEvent } from 'react'

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
            localStorage.setItem('currentProfile', JSON.stringify(user.providerData))
            router.push('/')
          }
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.customData.email
          const credential = GithubAuthProvider.credentialFromError(error)
        })
    }

    if (provider instanceof GithubAuthProvider) {
      signInWithPopup(auth, provider)
        .then(result => {
          const credential = GithubAuthProvider.credentialFromResult(result)
          // @ts-ignore
          const token = credential.accessToken

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
        })
    }
  }

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // @ts-ignore
    const email = e.target[1].value
    // @ts-ignore
    const password = e.target[2].value

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential)
        const user = userCredential.user
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
  }

  return { handleSignIn, handleSignUp }
}
