import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  useRef,
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
} & ComponentPropsWithoutRef<'select'>

export const Select = (props: Props) => {
  const refName = useRef(null)
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  console.log(value)

  return (
    <div className={s.select} onClick={() => setOpen(prev => !prev)}>
      <IoIosArrowDown className={!open ? s.arrow : clsx(s.arrow, s.active)} />
      <div className={open ? s.dropDawn : clsx(s.dropDawn, s.active)} ref={refName}>
        <option onClick={() => setValue(value)} value={value}>
          hello
        </option>
      </div>
    </div>
  )
}
