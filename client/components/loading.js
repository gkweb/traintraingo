import styled, { keyframes } from 'styled-components'
import Logo from './../components/logo-no-text'

const LoadingAnim = keyframes`
  from {
    transform: scale(.75)
  }
`

const LoadingContainerElem = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.secondaryBg};
  color: ${props => props.theme.primary};
  text-align: center;
`

const LogoContainerElem = styled.div`
  max-width: 4em;
  margin: 0 auto 0.5em;
  animation: ${LoadingAnim} 1s linear 1.2s infinite alternate;
  animation-fill-mode: both;
`

const LoadingTextElem = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1.125em;
  color: ${props => props.theme.primary};
`

const Loading = () => (
  <LoadingContainerElem>
    <LogoContainerElem>
      <Logo />
    </LogoContainerElem>
    <LoadingTextElem>Loading...</LoadingTextElem>
  </LoadingContainerElem>
)

export default Loading
