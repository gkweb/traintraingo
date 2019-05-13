import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import withApolloClient from './../lib/with-apollo-client'
import { ThemeManagementProvider, ThemeManagementContext } from './../lib/theme'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { parseCookies } from 'nookies'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    transition: color, background-color, border-color .25s ease; 
  }
`

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const cookies = parseCookies(ctx)

    const activeTheme = cookies.activeTheme || 'light'

    return { pageProps, activeTheme }
  }

  render() {
    const { Component, pageProps, apolloClient, activeTheme } = this.props
    return (
      <ThemeManagementProvider activeTheme={activeTheme}>
        <ThemeManagementContext.Consumer>
          {context => (
            <ThemeProvider theme={context.theme.values}>
              <Container>
                <GlobalStyle />
                <ApolloProvider client={apolloClient}>
                  <Component {...pageProps} />
                </ApolloProvider>
              </Container>
            </ThemeProvider>
          )}
        </ThemeManagementContext.Consumer>
      </ThemeManagementProvider>
    )
  }
}

export default withApolloClient(MyApp)
