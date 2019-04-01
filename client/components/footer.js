import styled from 'styled-components'
import Link from 'next/link'

const FooterElem = styled.footer`
  margin-top: 5em;
  color: #ddd;
`

const LinkElem = styled.a`
  color: #ddd;
  &:visited {
    color: #ddd;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

const Footer = () => (
  <FooterElem>
    <p>Data supplied by ptv (Public Transport Victoria). Obtain your API Access <LinkElem href="https://www.data.vic.gov.au/data/dataset/ptv-timetable-api">here</LinkElem></p>
    <LinkElem href="https://gladekettle.com.au" target="_blank">Created by gkweb</LinkElem>
  </FooterElem>
)


export default Footer
