import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import withApolloClient from './../lib/with-apollo-client'
import {dark, light} from './../lib/theme'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ThemeProvider theme={light}>
        <Container>
          <GlobalStyle />
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Container>
      </ThemeProvider>
    )
  }
}

export default withApolloClient(MyApp)
