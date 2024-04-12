import { ReactElement } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { IoMdClose } from 'react-icons/io'

import s from './Modal.module.scss'

type Props = {
  children: ReactElement
  className?: string
  disabled: boolean
  onClose: (open: boolean) => void
  open?: boolean
  trigger?: ReactElement
}

const Modal = ({ children, className, disabled, onClose, open, trigger }: Props) => {
  return (
    <Dialog.Root onOpenChange={onClose} open={open}>
      <Dialog.Trigger asChild className={s.btn}>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Close asChild>
          <button aria-label={'Close'} className={s.IconButton}>
            <IoMdClose className={s.closeIcon} />
          </button>
        </Dialog.Close>
        <Dialog.Content asChild className={className}>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
