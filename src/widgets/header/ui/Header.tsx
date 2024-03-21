import { FaRegUserCircle } from 'react-icons/fa'
import { IoIosSearch } from 'react-icons/io'

import s from './Header.module.scss'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <ul className={s.nav}>
          <li>
            <h1>Movie 2.0</h1>
          </li>
          <li>Главная</li>
          <li>Фильмы</li>
          <li>Сериалы</li>
          <li>Мультфильмы</li>
        </ul>

        <ul className={s.auth}>
          <li>
            <IoIosSearch />
          </li>
          <li>
            <FaRegUserCircle />
          </li>
        </ul>
      </div>
    </header>
  )
}
