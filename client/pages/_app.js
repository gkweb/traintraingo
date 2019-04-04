import App, {Container} from 'next/app'
import React from 'react'
import {ApolloProvider} from 'react-apollo'
import withApolloClient from './../lib/with-apollo-client'
import {ThemeManagementProvider, ThemeManagementContext} from './../lib/theme'
import {createGlobalStyle, ThemeProvider} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ThemeManagementProvider>
        <ThemeManagementContext.Consumer>
            {
              (context) => (<>
              <ThemeProvider theme={context.theme.values}>
                <Container>
                  <GlobalStyle />
                  <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} />
                  </ApolloProvider>
                </Container>
              </ThemeProvider>
            </>
            )
          }
        </ThemeManagementContext.Consumer>
      </ThemeManagementProvider>
    )
  }
}

export default withApolloClient(MyApp)
