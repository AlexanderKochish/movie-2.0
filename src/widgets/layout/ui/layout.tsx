import type { AppProps } from 'next/app'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { Header } from '@/widgets/header'

import s from './Layuot.module.scss'

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
