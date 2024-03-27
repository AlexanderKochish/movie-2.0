import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  useState,
} from 'react'

import clsx from 'clsx'
import { IoIosArrowDown } from 'react-icons/io'

import s from './Select.module.scss'
type Props = {
  className?: string
  onValueChange?: () => void
  options?: string[]
  value?: string
}

export const Select = (props: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={s.select} onClick={() => setOpen(prev => !prev)}>
      <IoIosArrowDown className={!open ? s.arrow : clsx(s.arrow, s.active)} />
      <div className={open ? s.dropDawn : clsx(s.dropDawn, s.active)}></div>
    </div>
  )
}
