import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/shared/ui/Button/Button'

type Props = {
  data: any
  item: number
  onTotal: any
}

export const Pagination = ({ data, item = 12, onTotal }: Props) => {
  const [page, setPage] = useState(1)

  const pagination = useMemo(() => {
    const pages = Math.ceil((data?.cast.length || 0) / item)
    const x = Array.from({ length: pages }, (_, i) => i + 1)

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
    <>
      {pagination.x.map(i => (
        <Button key={i} onClick={() => setPage(i)} variant={'text'}>
          {i}
        </Button>
      ))}
    </>
  )
}
