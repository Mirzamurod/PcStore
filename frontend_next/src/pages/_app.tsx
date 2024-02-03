// React Imports
import { Fragment, ReactNode } from 'react'

// Next Imports
import type { NextPage } from 'next'
import { Router } from 'next/router'
import type { AppProps } from 'next/app'

// Next-i18next
import { appWithTranslation } from 'next-i18next'

// Loader Import
import NProgress from 'nprogress'
import NextNProgress from 'nextjs-progressbar'

// Third Party Import
import { ToastContainer } from 'react-toastify'

// Config Imports
import themeConfig from '@/configs/themeConfig'
import BlankLayout from '@/components/BlankLayout'
import { store } from '@/store'
import { Provider } from 'react-redux'
import Head from 'next/head'
import GuestGuard from '@/components/auth/GuestGuard'
import AuthGuard from '@/components/auth/AuthGuard'
import ThemeComponent from '@/components/ThemeComponent'
import WindowWrapper from '@/components/window-wrapper'
import { AuthProvider } from '@/context/AuthContext'

// Css
import 'react-toastify/dist/ReactToastify.css'
import '/node_modules/flag-icons/css/flag-icons.min.css'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/styles/globals.scss'

type ExtendedAppProps = AppProps & {
  Component: NextPage
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

// Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<h3>Loading1</h3>}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <Fragment>{children}</Fragment>
  } else {
    return <AuthGuard fallback={<h3>Loading2</h3>}>{children}</AuthGuard>
  }
}

// Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, pageProps } = props

  // Variables
  // const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout = Component.getLayout ?? (page => <BlankLayout>{page}</BlankLayout>)

  // const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  return (
    <Provider store={store}>
      <Head>
        <title>PcStore</title>
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        />
        <meta name='description' />
        <meta name='keywords' content='PcStore, ...' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <AuthProvider>
        <ThemeComponent>
          <WindowWrapper>
            <Guard authGuard={authGuard} guestGuard={guestGuard}>
              <NextNProgress color='#CF052D' />
              <Fragment>{getLayout(<Component {...pageProps} />)}</Fragment>
            </Guard>
            <ToastContainer />
          </WindowWrapper>
        </ThemeComponent>
      </AuthProvider>
    </Provider>
  )
}

export default appWithTranslation(App)
