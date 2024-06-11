import { ReactNode } from 'react'

import { Header } from '@/widgets/header'

import s from './Layout.module.scss'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className={s.main}>{children}</main>
    </>
  )
}
