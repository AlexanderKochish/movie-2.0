import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoIosSearch } from 'react-icons/io'
import { LiaAdn } from 'react-icons/lia'
import { RiMovie2Line } from 'react-icons/ri'

import s from './Header.module.scss'

export const Header = () => {
  const { pathname } = useRouter()

  const activePath = (path: string) => (pathname === path ? `${s.navItem} ${s.active}` : s.navItem)

  return (
    <header className={s.header}>
      <div className={s.container}>
        <ul className={s.nav}>
          <li>
            <h1>
              <RiMovie2Line />
            </h1>
          </li>
          <li className={activePath('/')}>
            <Link href={'/'}>Главная</Link>
          </li>
          <li className={activePath('/movies')}>
            <Link href={'/movies'}>Фильмы</Link>
          </li>
          <li className={activePath('/series')}>
            <Link href={'/series'}>Сериалы</Link>
          </li>
          <li className={activePath('/cartoons')}>
            <Link href={'/cartoons'}>Мультфильмы</Link>
          </li>
        </ul>

        <ul className={s.auth}>
          <li>
            <IoIosSearch />
          </li>
          <li>
            <Link href={'/auth/sign-in'}>
              <FaRegUserCircle />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
