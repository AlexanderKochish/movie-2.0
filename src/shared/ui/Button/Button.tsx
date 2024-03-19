import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import s from './Button.module.scss'

type Props<T extends ElementType = 'button'> = {
  asComponent?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  variant: 'outline' | 'primary' | 'red' | 'text'
} & ComponentPropsWithoutRef<T>

type ButtonComponent = <T extends ElementType = 'button'>(props: Props<T>) => ReactNode
export const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(props: Props<T>, ref: any) => {
    const { asComponent, children, className, fullWidth, variant = 'primary', ...rest } = props
    const Component = asComponent || 'button'
    const clazz = clsx(s[variant], className, fullWidth ? s.fullWidth : '')

    return (
      <Component className={clazz} {...rest} ref={ref}>
        {children}
      </Component>
    )
  }
)
