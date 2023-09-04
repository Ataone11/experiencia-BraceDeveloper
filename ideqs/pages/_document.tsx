import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <meta name="theme-color" content="#086EAE" />
          <meta
            name="description"
            content="Desde 1995, brindamos soluciones de seguridad para la expedición de documentos a la medida, transformando la identificación a un mundo digital."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
