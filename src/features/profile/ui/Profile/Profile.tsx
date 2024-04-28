import { LogOut } from '@/features/auth/ui/LogOut/LogOut'
import { UserImpl } from '@firebase/auth/internal'
import { collection, doc, getDoc, query, where } from '@firebase/firestore'
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'

import s from './Profile.module.scss'

import { auth, db } from '../../../../../firebase'

export const Profile = () => {
  const [profile] = useAuthState(auth)
  const docRef = doc(db, 'users', profile?.uid || '')
  const [snapshot, loading, error] = useDocument(docRef)

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  const user = snapshot?.data()

  return (
    <div className={s.wrapper}>
      <div>
        <div>{user?.email}</div>
        <div>{user?.name}</div>
        <div>{user?.phoneNumber}</div>
        <LogOut />
      </div>
    </div>
  )
}
