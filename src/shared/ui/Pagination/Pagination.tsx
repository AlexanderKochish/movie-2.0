import { useEffect } from 'react'

import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import s from './Pagination.module.scss'

import { usePagination } from './usePagination'

type Props = {
  currentPage: number
  onChangePage: (page: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
}

export const Pagination = ({
  currentPage,
  onChangePage,
  pageSize,
  siblingCount = 1,
  totalCount,
}: Props) => {
  const router = useRouter()
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  })

  const handleClickPrev = (name: string, page: number) => {
    onChangePage(currentPage - 1)

    const currentQuery = router?.query
    const updatedQuery = {
      ...currentQuery,
      [name]: page,
    }

    void router.push({
      pathname: router.pathname,
      query: updatedQuery,
    })
  }

  const handleClickNext = (name: string, page: number) => {
    onChangePage(currentPage + 1)

    const currentQuery = router?.query
    const updatedQuery = {
      ...currentQuery,
      [name]: page,
    }

    void router.push({
      pathname: router.pathname,
      query: updatedQuery,
    })
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === paginationRange[paginationRange.length - 1]

  return (
    <div className={clsx(s.container)}>
      <div className={s.pagination}>
        <button
          className={clsx(s.item, { [s.disabled]: isFirstPage })}
          disabled={isFirstPage}
          onClick={() => handleClickPrev('page', currentPage - 1)}
        >
          <FaArrowLeft className={s.left} height={20} width={20} />
        </button>
        {paginationRange.map((num, i) => {
          if (num === 0) {
            return (
              <span className={clsx(s.item, s.dots)} key={i}>
                &#8230;
              </span>
            )
          }
          const isCurrentPage = num === currentPage

          const handleChangePage = (name: string, page: string | string[] | undefined) => {
            onChangePage(num)

            const currentQuery = router?.query
            const updatedQuery = {
              ...currentQuery,
              [name]: page,
            }

            void router.push({
              pathname: router.pathname,
              query: updatedQuery,
            })
          }

          return (
            <button
              className={clsx(s.item, { [s.selected]: isCurrentPage })}
              key={i}
              onClick={() => handleChangePage('page', String(num))}
            >
              <span>{num}</span>
            </button>
          )
        })}
        <button
          className={clsx(s.item, { [s.disabled]: isLastPage })}
          disabled={isLastPage}
          onClick={() => handleClickNext('page', currentPage + 1)}
        >
          <FaArrowRight className={s.right} height={20} width={20} />
        </button>
      </div>
    </div>
  )
}
