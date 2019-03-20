import styled from 'styled-components'
import Logo from './../components/logo-no-text'

const HeaderElem = styled.header`
  display: flex;
  flex-wrap: row wrap;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, .25);
`

const TitleElem = styled.h1`
  margin: 0 0 0 .5em;
  color: white;
`

const LogoContainer = styled.div`
  max-width: 5em;
  margin: 0;
`

const Header = ({headerTitle}) => (
  <HeaderElem>
    <LogoContainer>
      <Logo />
    </LogoContainer>
    {headerTitle ? <TitleElem>{headerTitle}</TitleElem> : null}
  </HeaderElem>
)

export default Header
