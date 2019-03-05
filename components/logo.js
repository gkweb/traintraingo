import styled from 'styled-components'

const LogoContainerStyled = styled.div`
  max-width: 3em;
  margin: 0;
`

const LogoStyled = styled.svg`
  display: block;
  width: 100%;
  height: auto;
`

const Logo = (props) => (
  <LogoContainerStyled>
    <LogoStyled width="238" height="328" viewBox="0 0 238 328" xmlns="http://www.w3.org/2000/svg">
      <g fill={props.color || '#000'} fillRule="nonzero">
        <circle cx="120.5" cy="42.5" r="36.5"/>
        <path d="M138.398 166.823l13.59-6.349-31.628-67.703L4.995 323.5h230.14l-26.74-54.804-13.481 6.577 16.212 33.227H29.266L119.9 127.23z"/>
      </g>
    </LogoStyled>
  </LogoContainerStyled>
)

export default Logo
