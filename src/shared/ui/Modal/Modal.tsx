import { ReactElement } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { IoMdClose } from 'react-icons/io'

import s from './Modal.module.scss'

type Props = {
  btn?: boolean
  children: ReactElement
  className?: string
  classNameOverlay?: string
  disabled: boolean
  onClose: (open: boolean) => void
  open?: boolean
  trigger?: ReactElement
}

const Modal = ({
  btn,
  children,
  className,
  classNameOverlay,
  disabled,
  onClose,
  open,
  trigger,
}: Props) => {
  return (
    <Dialog.Root onOpenChange={onClose} open={open}>
      {trigger && (
        <Dialog.Trigger asChild className={s.btn}>
          {trigger}
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className={clsx(s.overlay, classNameOverlay)} />
        {btn && (
          <Dialog.Close asChild>
            <button aria-label={'Close'} className={s.iconBtn}>
              <IoMdClose className={s.closeIcon} />
            </button>
          </Dialog.Close>
        )}
        <Dialog.Content asChild className={clsx(s.content, className)}>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
