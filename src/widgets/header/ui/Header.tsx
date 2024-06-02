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
import { ImHome } from 'react-icons/im'
import { IoMdClose } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { MdOutlineLiveTv, MdOutlineLocalMovies } from 'react-icons/md'
import { RiMovie2Line } from 'react-icons/ri'
import { TbCards } from 'react-icons/tb'

import s from './Header.module.scss'

import { auth } from '../../../../firebase'

export const Header = () => {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const [user, loading, error] = useAuthState(auth)
  const [navBar, setNavBar] = useState(false)

  const { events, pathname } = useRouter()

  useEffect(() => {
    events.on('routeChangeComplete', () => {
      setNavBar(false)
    })

    return () => {
      events.off('routeChangeComplete', () => {
        setNavBar(false)
      })
    }
  }, [events])

  const activePath = (path: string) => (pathname === path ? clsx(s.navItem, s.active) : s.navItem)

  return (
    <div>
      <header className={!navBar ? s.header : clsx(s.header, s.active)}>
        <ul className={s.nav}>
          <li>
            <Link href={'/'}>
              <h1 className={s.logo}>MD</h1>
            </Link>
          </li>
          <li>
            <ul className={s.navBar}>
              <li className={activePath('/')}>
                <Link href={'/'}>
                  <ImHome className={s.icon} />
                </Link>
              </li>
              <li className={activePath('/movies')}>
                <Link href={'/movies'}>
                  <MdOutlineLocalMovies className={s.icon} />
                </Link>
              </li>
              <li className={activePath('/series')}>
                <Link href={'/series'}>
                  <MdOutlineLiveTv className={s.icon} />
                </Link>
              </li>
              <li className={activePath('/cartoons')}>
                <Link href={'/cartoons'}>
                  <TbCards className={s.icon} />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </header>
      <div className={s.auth}>
        <div>
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
        </div>
        <>
          {user ? (
            <div>
              <Link href={`/profile/${user?.uid}`}>
                {' '}
                <Image
                  alt={'profile'}
                  className={s.img}
                  height={35}
                  loading={'lazy'}
                  src={user?.photoURL || ''}
                  width={35}
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
        </>
        <>
          {!navBar ? (
            <GiHamburgerMenu className={s.burgerMenu} onClick={() => setNavBar(prev => !prev)} />
          ) : (
            <IoMdClose className={s.burgerMenu} onClick={() => setNavBar(prev => !prev)} />
          )}
        </>
      </div>
    </div>
  )
}
