import { ChangeEvent, ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './TextField.module.scss'

export type TextFieldProps = {
  className?: string
  error?: string
  label?: string
  onValueChange?: (value: string) => void
  type?: 'email' | 'password' | 'text'
} & Omit<ComponentPropsWithoutRef<'input'>, 'type'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      disabled,
      error,
      id,
      label,
      onKeyDown,
      onValueChange,
      type = 'text',
      value,
      ...props
    },
    ref
  ) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(e)
      onValueChange?.(e.target.value)
    }
    const clearFieldHandler = () => {
      onValueChange?.('')
    }

    return (
      <div className={s.inputBlock}>
        <label htmlFor={id}>{label}</label>
        <input className={s.input} id={id} onChange={onChangeHandler} type={type} value={value} />
        {error && <span className={s.error}>{error}</span>}
      </div>
    )
  }
)
