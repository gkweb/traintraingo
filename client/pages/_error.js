import React from 'react'
import styled from 'styled-components'
import NextSeo from 'next-seo'
import Main from './../components/main'
import { PageContainer } from './../components/layout'
import { P as Blurb, H1 as Title } from './../components/text'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <PageContainer>
        <Main>
          <Title>Something broke!</Title>
          <Blurb>
            {this.props.statusCode
              ? `Error ${this.props.statusCode} occurred`
              : 'Error occurred'}
          </Blurb>
        </Main>
      </PageContainer>
    )
  }
}
