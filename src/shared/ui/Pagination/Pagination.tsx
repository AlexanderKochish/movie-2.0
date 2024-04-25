import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/shared/ui/Button/Button'
import clsx from 'clsx'

import s from './Pagination.module.scss'
type Props = {
  data: any
  item: number
  onTotal: any
  position?: string
}

export const Pagination = ({ data, item = 12, onTotal, position = 'start' }: Props) => {
  const [page, setPage] = useState(1)

  const pagination = useMemo(() => {
    const x = Math.ceil((data?.cast.length || 0) / item)
    const pages = Array.from({ length: x }, (_, i) => i + 1)

    const count = data?.cast.slice((page - 1) * item, page * item)

    return {
      count,
      pages,
      x,
    }
  }, [page, item, data])

  useEffect(() => {
    onTotal(pagination.count)
  }, [page, pagination.count, onTotal])

  return (
    <div style={{ display: 'flex', justifyContent: position, width: '100%' }}>
      {pagination.pages.map(i => (
        <Button
          className={page === i ? clsx(s.paginationBtn, s.active) : s.paginationBtn}
          key={i}
          onClick={() => setPage(i)}
          variant={'outline'}
        >
          {i}
        </Button>
      ))}
    </div>
  )
}
