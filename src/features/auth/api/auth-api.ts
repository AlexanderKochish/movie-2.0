import { FormEvent } from 'react'

import { createUserWithEmailAndPassword } from '@firebase/auth'
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'

import { auth } from '../../../../firebase'

export const useAuth = () => {
  const router = useRouter()
  const provider = new GithubAuthProvider()

  const handleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result)
        // @ts-ignore
        const token = credential.accessToken

        console.log(token)
        // The signed-in user info.
        const user = result.user

        if (token) {
          router.push('/')
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error)
        // ...
      })
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
