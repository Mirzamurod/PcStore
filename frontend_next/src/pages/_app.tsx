import NextNProgress from 'nextjs-progressbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color='#f00' height={5} />
      <Component {...pageProps} />
    </>
  )
}
