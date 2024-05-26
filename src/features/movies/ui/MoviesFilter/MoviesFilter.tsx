import { useState } from 'react'

import { Option } from '@/features/movies/types/movies.types'
import { Button } from '@/shared/ui/Button/Button'
import { MySelect } from '@/shared/ui/Select/Select'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './MoviesFilter.module.scss'

const sortBy = [
  { label: 'popularity.desc', name: 'popular', value: 'popularity.desc' },
  { label: 'popularity.asc', name: 'popular', value: 'popularity.asc' },
  { label: 'revenue.desc', name: 'popular', value: 'revenue.desc' },
  { label: 'revenue.asc', name: 'popular', value: 'revenue.asc' },
  { label: 'title.desc', name: 'popular', value: 'title.desc' },
]

type Props = {
  genreList: any
  isFilteredMenu: boolean
  rating: any
  years: any
}

export const MoviesFilter = ({ genreList, isFilteredMenu, rating, years }: Props) => {
  const [selectedYear, setSelectedYear] = useState<Option | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<Option | null>(null)
  const [selectedPopular, setSelectedPopular] = useState<Option | null>(null)
  const [selectedRating, setSelectedRating] = useState<Option | null>(null)
  const router = useRouter()

  const handleFilterChange = (filterName: string, filterValue: string) => {
    const currentQuery = router.query
    const updatedQuery = {
      ...currentQuery,
      [filterName]: filterValue,
    }

    void router.push({
      pathname: router.pathname,
      query: updatedQuery,
    })
  }

  return (
    <div className={!isFilteredMenu ? s.firstBlock : clsx(s.firstBlock, s.active)}>
      <MySelect
        handleFilterChange={handleFilterChange}
        onChange={setSelectedGenre}
        options={genreList}
        placeholder={router.query.genre || 'Genres'}
        value={selectedGenre}
      />
      <MySelect
        handleFilterChange={handleFilterChange}
        onChange={setSelectedYear}
        options={years}
        placeholder={router.query.year || 'Year'}
        value={selectedYear}
      />
      <MySelect
        handleFilterChange={handleFilterChange}
        onChange={setSelectedRating}
        options={rating}
        placeholder={router.query.rating || 'Rating'}
        value={selectedRating}
      />
      <MySelect
        handleFilterChange={handleFilterChange}
        onChange={setSelectedPopular}
        options={sortBy}
        placeholder={router.query.popular || 'Popular'}
        value={selectedPopular}
      />
      <Button className={s.selectedBtn} fullWidth variant={'primary'}>
        Show results
      </Button>
    </div>
  )
}
