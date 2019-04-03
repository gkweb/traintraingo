import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: <>{initialProps.styles}{sheet.getStyleElement()}</>
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link rel="manifest" href="/static/site.webmanifest"></link>
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://traintraingo.com.au/static/traintraingo-og.jpg" />
          <meta property="og:url" content="https://traintraingo.com.au" />
          <meta property="og:title" content="Train train go - Train times with no bloat" />
          <meta property="og:description" content="Train times with no bloat" />
          <link href="https://fonts.googleapis.com/css?family=Lustria|Poppins" rel="stylesheet" />
          <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-PZ6NPVX"></script>
          <meta name="google-site-verification" content="9dY53anL1oi2J0zy4C94gqeWbKUVSnpS2z6iRu9Ognc" />
          <style>{`body { margin: 0; padding: 0; font-family:${'Lustria'},serif; }; html {text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased;}; * {box-sizing: border-box;}`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
