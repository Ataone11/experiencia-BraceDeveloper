import '../styles/globals.scss'
import "../styles/base.css"
import type { AppProps } from 'next/app'
import Layout from '../components/general/Layout'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
