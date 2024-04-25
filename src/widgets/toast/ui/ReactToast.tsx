import { Slide, ToastContainer } from 'react-toastify'

import { ToastCloseButton } from '@/widgets/toast/ui/ToastCloseButton/ToastCloseButton'

type Props = {}

export const ReactToastProvider = (props: Props) => {
  return (
    <ToastContainer
      autoClose={3000}
      closeButton={<ToastCloseButton />}
      closeOnClick
      draggable={false}
      hideProgressBar
      icon={false}
      newestOnTop
      pauseOnFocusLoss={false}
      pauseOnHover
      position={'bottom-left'}
      rtl={false}
      theme={'colored'}
      transition={Slide}
    />
  )
}
