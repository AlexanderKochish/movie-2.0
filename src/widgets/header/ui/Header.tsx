import { useEffect, useState } from 'react'

import { LogOut } from '@/features/auth/ui/LogOut/LogOut'
import { SearchMovie } from '@/features/movies/ui/SearchMovie/SearchMovie'
import { ProfileResponse } from '@/features/profile/types/profile.types'
import { useLocalStorageProfile } from '@/shared/hooks/useLocalStorageProfile'
import Modal from '@/shared/ui/Modal/Modal'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { RiMovie2Line } from 'react-icons/ri'

import s from './Header.module.scss'

export const Header = () => {
  const [name, setName] = useState('')
  const [scroll, setScroll] = useState(0)
  const [scrollDirection, setScrollDirection] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<ProfileResponse | null>(() =>
    useLocalStorageProfile()
  )
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

  useEffect(() => {
    document.addEventListener('scroll', scrollTop)

    return () => {
      document.removeEventListener('scroll', scrollTop)
    }
  }, [scroll, scrollDirection])

  useEffect(() => {
    const profile = useLocalStorageProfile()

    if (profile) {
      setCurrentProfile(profile)
    }
  }, [])

  return (
    <header className={scrollDirection ? clsx(s.header, s.active) : s.header}>
      <div className={s.container}>
        <ul className={s.nav}>
          <li>
            <h1>
              <Link href={'/'}>
                <RiMovie2Line />
              </Link>
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
            <Modal
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
            {currentProfile ? (
              <div>
                <Link href={`/profile/${currentProfile.uid}`}>
                  {' '}
                  <Image
                    alt={'profile'}
                    className={s.img}
                    height={30}
                    loading={'lazy'}
                    src={currentProfile?.photoURL}
                    width={30}
                  />
                </Link>
                <LogOut />
              </div>
            ) : (
              <Link href={'/auth/sign-in'}>
                <FaRegUserCircle className={s.icon} />
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}
