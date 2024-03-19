import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import s from './Card.module.scss'
type Props<T extends ElementType = 'div'> = {
  asComponent?: T
  children?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>
type CardComponent = <T extends ElementType = 'div'>(props: Props<T>) => ReactNode
export const Card: CardComponent = forwardRef(
  <T extends ElementType = 'div'>(props: Props<T>, ref: any) => {
    const { asComponent, children, className, ...rest } = props
    const Component = asComponent || 'div'

    return (
      <Component className={clsx(s.card, className)} {...rest} ref={ref}>
        {children}
      </Component>
    )
  }
)
