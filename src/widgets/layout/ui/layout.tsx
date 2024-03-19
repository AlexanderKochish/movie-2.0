import { ReactNode } from 'react'

import { Header } from '@/widgets/header'

type Props = {
  children: ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
