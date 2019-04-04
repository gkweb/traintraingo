import styled from 'styled-components'
import {Menu as MenuIcon, Close as CloseIcon} from './icon'
import {themes} from './../lib/theme'

const MenuContainerElem = styled.div`
  padding: 1em;
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  max-width: 15em;
  height: 100%;
  overflow-y: auto;
  z-index: 300;
  background-color: ${props => props.theme.primaryBg};
  box-shadow: -.0625em .125em .5em -.125em rgba(0,0,0,.125);
`

const MenuNavElem = styled.nav`

`

const MenuToggleElem = styled.button`
  padding: .5em;
  width: 2em;
  position: fixed;
  top: 1em;
  right: 1em;
  z-index: 301;
  background: none;
  padding: 0;
  border: 0;
`

const MenuToggle = ({onClick, isOpen}) => (
  <MenuToggleElem onClick={onClick}>
    {isOpen ? <CloseIcon />: <MenuIcon />}
  </MenuToggleElem>
)

const Menu = (props) => (
  <>
  <MenuToggle isOpen={true}/>
  <MenuContainerElem>
    <MenuNavElem>
      <h3>Settings</h3>
      <p>Theme</p>
      {
        Object.keys(themes).map((val, index) => (
          <button key={index}>{val}</button>
        ))
      }
    </MenuNavElem>
  </MenuContainerElem>
  </>
)

export default Menu
