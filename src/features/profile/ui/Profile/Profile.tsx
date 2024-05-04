import { useForm } from 'react-hook-form'

import { LogOut } from '@/features/auth/ui/LogOut/LogOut'
import {
  profileSchema,
  profileSchemaValues,
} from '@/features/profile/model/validators/profileSchema'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { ControlledTextField } from '@/shared/ui/ControlInput/ControlledInput'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { doc } from '@firebase/firestore'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import z from 'zod'

import s from './Profile.module.scss'

import { auth, db } from '../../../../../firebase'
import { ImageIcon } from '../../../../../public/icons/icons'

export const Profile = () => {
  const { control } = useForm<profileSchemaValues>({
    defaultValues: {
      aboutMe: '',
      phone: '',
      username: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(profileSchema()),
  })
  const [profile] = useAuthState(auth)
  const docRef = doc(db, 'users', profile?.uid || '')
  const [snapshot, loading, error] = useDocument(docRef)

  if (loading) {
    return <Preloader />
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  const user = snapshot?.data()

  return (
    <Card className={s.wrapper}>
      <div className={s.imgBlock}>
        <div className={s.img}>
          {user?.photo ? (
            <Image alt={user?.name} fill src={user?.photo || ''} />
          ) : (
            <ImageIcon height={48} width={48} />
          )}
        </div>
        <Button variant={'primary'}>Add Profile Photo</Button>
      </div>
      <Card asComponent={'form'} className={s.form}>
        <h2>Profile Setting</h2>
        <ControlledTextField control={control} name={'username'} />
        <ControlledTextField control={control} name={'phone'} />
        <ControlledTextField control={control} name={'aboutMe'} />
        <div className={s.parent}>
          <textarea></textarea>
        </div>
      </Card>
    </Card>
  )
}
// <div>{user?.email}</div>
// <div>{user?.name}</div>
// <div>{user?.phoneNumber}</div>
// <LogOut/>
