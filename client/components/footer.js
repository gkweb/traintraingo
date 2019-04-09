import styled from 'styled-components'
import Link from 'next/link'

const FooterElem = styled.footer`
  padding: 0 1em 3em;
  margin-top: 5em;
  color: ${props => props.theme.secondary};
`

const LinkElem = styled.a`
  color: ${props => props.theme.secondary};
  &:visited {
    color: ${props => props.theme.secondary};
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

const Footer = () => (
  <FooterElem>
    <p>
      Data supplied by ptv (Public Transport Victoria). Obtain your API Access{' '}
      <LinkElem href="https://www.data.vic.gov.au/data/dataset/ptv-timetable-api">
        here
      </LinkElem>
    </p>
    <LinkElem href="https://gladekettle.com.au" target="_blank">
      Created by gkweb
    </LinkElem>
  </FooterElem>
)

export default Footer
