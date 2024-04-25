import { Slide, ToastContainer } from 'react-toastify'

type Props = {}

export const ReactToastProvider = (props: Props) => {
  return (
    <ToastContainer
      autoClose={5000}
      closeOnClick
      draggable={false}
      hideProgressBar
      icon={false}
      newestOnTop
      pauseOnFocusLoss={false}
      pauseOnHover
      position={'bottom-left'}
      rtl={false}
      style={{ bottom: 100, height: 50, left: 100, position: 'absolute', width: 200 }}
      theme={'colored'}
      transition={Slide}
    />
  )
}
