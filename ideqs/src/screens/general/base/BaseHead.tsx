import Head from 'next/head'

interface Params {
  title: string
  description: string
  label?: any
}
const BaseHead = ({ title, description, label }: Params) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      {label}
    </Head>
  )
}

export default BaseHead
