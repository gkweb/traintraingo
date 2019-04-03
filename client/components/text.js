import styled from 'styled-components'

export const H1 = styled.h1`
  margin: 1rem auto;
  max-width: 20em;
  font-family: 'Poppins', sans-serif;
  font-size: 2.25em;
  color: ${props => props.theme.primary};

  @media screen and (min-width: 48em) {
    font-size: 3.25em;
  }
`

export const H2 = styled.h2`
  margin: 1rem 0;
  max-width: 20em;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.primary};
  font-size: 1.25em;

  @media screen and (min-width: 48em) {
    font-size: 2.25em;
  }
`

export const H3 = styled.h3`
  margin: 1rem 0;
  max-width: 20em;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.primary};
  font-size: 1.25em;

  @media screen and (min-width: 48em) {
    font-size: 1.85em;
  }
`

export const P = styled.p`
  margin: 1em auto;
  text-align: center;
  max-width: 30em;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.primary};
  font-size: 1em;

  @media screen and (min-width: 48em) {
    font-size: 2em;
  }
`
