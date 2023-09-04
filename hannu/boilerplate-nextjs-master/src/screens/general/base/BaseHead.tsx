import Head from 'next/head'

interface Params {
    title: string
    description: string
    children?: any
}
const BaseHead = ({title, description, children}: Params) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        {children}
    </Head>
  )
}

export default BaseHead