import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { wrapper } from '@/app/store/store'
import { useLoader } from '@/shared/hooks/useLoader'
import { Page } from '@/shared/types/layout'
import { Inter } from 'next/font/google'

import '../app/styles/index.scss'

type Props = AppProps & {
  Component: Page
}
const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: Props) => {
  const { props, store } = wrapper.useWrappedStore(pageProps)

  useLoader()
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <>
      <Provider store={store}>
        {getLayout(<Component className={inter.className} {...props.pageProps} />)}
      </Provider>
    </>
  )
}

export default App
