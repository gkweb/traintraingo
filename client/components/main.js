import styled from 'styled-components'

const Main = styled.main`
  box-sizing: border-box;
  padding: 1em 1em 4em;
  min-height: 100vh;
  background: black;
  background-size: ${props => props.theme.primaryBg};
  background: linear-gradient(to bottom, ${props => props.theme.secondaryBg}, ${props => props.theme.primaryBg});
`

export default Main
