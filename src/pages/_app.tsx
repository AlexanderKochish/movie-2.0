import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { ErrorBoundary } from '@/app/providers/ErrorBoundary'
import { wrapper } from '@/app/store/store'
import { useLoader } from '@/shared/hooks/useLoader'
import { Page } from '@/shared/types/layout'
import { ReactToastProvider } from '@/widgets/toast/ui/ReactToast'
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
        <ErrorBoundary>
          {getLayout(<Component className={inter.className} {...props.pageProps} />)}
          <ReactToastProvider />
        </ErrorBoundary>
      </Provider>
    </>
  )
}

export default App
