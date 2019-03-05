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
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://gladekettle.com.au/static/front-end-developer-og.jpg" />
          <meta property="og:url" content="https://gladekettle.com.au" />
          <meta property="og:title" content="Glade Kettle - Front End Developer based in Melbourne Australia" />
          <meta property="og:description" content="Freelance Front End developer with proven delivery experience." />
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
