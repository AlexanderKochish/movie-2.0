import { useEffect, useState } from 'react'

import { SearchMovie } from '@/features/movies/ui/SearchMovie/SearchMovie'
import Modal from '@/shared/ui/Modal/Modal'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FaRegUserCircle } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { RiMovie2Line } from 'react-icons/ri'

import s from './Header.module.scss'

import { auth } from '../../../../firebase'

export const Header = () => {
  const [name, setName] = useState('')
  const [scroll, setScroll] = useState(0)
  const [scrollDirection, setScrollDirection] = useState(false)
  const [open, setOpen] = useState(false)
  const [user, loading, error] = useAuthState(auth)
  const [navBar, setNavBar] = useState(false)

  const { pathname } = useRouter()

  const activePath = (path: string) => (pathname === path ? `${s.navItem} ${s.active}` : s.navItem)
  const scrollTop = () => {
    const currentScroll = window.scrollY

    if (currentScroll > scroll) {
      setScrollDirection(true)
    } else {
      setScrollDirection(false)
    }

    setScroll(currentScroll)
  }

  // useEffect(() => {
  //   !navBar ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'visible')
  // }, [])

  useEffect(() => {
    document.addEventListener('scroll', scrollTop)

    return () => {
      document.removeEventListener('scroll', scrollTop)
    }
  }, [scroll, scrollDirection])

  return (
    <header className={scrollDirection ? clsx(s.header, s.active) : s.header}>
      <div className={s.container}>
        <ul className={s.nav}>
          <li>
            <h1 className={s.logo}>
              <Link href={'/'}>
                <RiMovie2Line />
              </Link>
            </h1>
          </li>
          <li>
            <ul className={!navBar ? s.navBar : clsx(s.navBar, s.active)}>
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
          </li>
        </ul>

        <ul className={s.auth}>
          <li>
            <Modal
              btn
              className={s.dialog}
              disabled={false}
              onClose={setOpen}
              open={open}
              trigger={<IoSearch className={s.icon} onClick={() => setOpen(!open)} />}
            >
              <div>
                <form className={s.searchForm}>
                  <h2 className={s.title}>Search</h2>
                  <label className={s.label} htmlFor={'search'}>
                    Movies, serials, cartoons
                  </label>
                  <input
                    className={s.search}
                    id={'search'}
                    onChange={e => setName(e.target.value)}
                    type={'text'}
                  />
                </form>
                <SearchMovie name={name} onOpen={setOpen} open={open} />
              </div>
            </Modal>
          </li>
          <li>
            {user ? (
              <div>
                <Link href={`/profile/${user?.uid}`}>
                  {' '}
                  <Image
                    alt={'profile'}
                    className={s.img}
                    height={30}
                    loading={'lazy'}
                    src={user?.photoURL || ''}
                    width={30}
                  />
                </Link>
              </div>
            ) : (
              <>
                <Link href={'/auth/sign-in'}>
                  <FaRegUserCircle className={s.icon} />
                </Link>
              </>
            )}
          </li>
          <li>
            {!navBar ? (
              <GiHamburgerMenu className={s.burgerMenu} onClick={() => setNavBar(prev => !prev)} />
            ) : (
              <IoMdClose className={s.burgerMenu} onClick={() => setNavBar(prev => !prev)} />
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}
