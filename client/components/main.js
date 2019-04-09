import styled from 'styled-components'

const Main = styled.main`
  box-sizing: border-box;
  min-height: 100vh;
  background: black;
  background-size: ${props => props.theme.primaryBg};
  background: linear-gradient(
    to bottom,
    ${props => props.theme.secondaryBg},
    ${props => props.theme.primaryBg}
  );
`

export default Main
