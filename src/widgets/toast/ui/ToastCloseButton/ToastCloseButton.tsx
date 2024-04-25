import React, { ComponentPropsWithoutRef } from 'react'

import { IoMdClose } from 'react-icons/io'

import s from './ToastCloseButton.module.scss'
type Props = {
  close?: (e: React.MouseEvent<HTMLElement>) => void
} & Omit<ComponentPropsWithoutRef<'button'>, 'type'>

export const ToastCloseButton = ({ close, ...rest }: Props) => {
  return (
    <button className={s.ToastCloseButton} onClick={close} {...rest}>
      <IoMdClose />
    </button>
  )
}
