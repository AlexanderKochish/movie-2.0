import { useState } from 'react'

import { SearchMovie } from '@/features/movies/ui/SearchMovie/SearchMovie'
import Modal from '@/shared/ui/Modal/Modal'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { RiMovie2Line } from 'react-icons/ri'

import s from './Header.module.scss'

export const Header = () => {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
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
            <Link href={'/auth/sign-in'}>
              <FaRegUserCircle className={s.icon} />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
