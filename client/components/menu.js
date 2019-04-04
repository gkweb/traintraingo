import {Component} from 'react'
import styled from 'styled-components'
import {Menu as MenuIcon, Close as CloseIcon} from './icon'
import {H3, P} from './text'
import {themes, ThemeManagementProvider, ThemeManagementContext} from './../lib/theme'

const MenuContainerOverlayElem = styled.div`
  position: fixed;
  top: 0;
  right: 15em;
  bottom: 0;
  left: 0;
  z-index: 299;
`

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
  color: ${props => props.theme.secondary}
`

const MenuToggle = ({onClick, isOpen}) => (
  <MenuToggleElem onClick={onClick}>
    {isOpen ? <CloseIcon />: <MenuIcon />}
  </MenuToggleElem>
)

const ThemeToggleElem = styled.button`
  background: none;
  border: 0;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  background: linear-gradient(90deg, ${props => props.bgColor}, ${props => props.bgColor} 75%, ${props => props.borderColor} 76%, ${props => props.borderColor} 100%);
  border: 1px solid ${props => props.theme.primary};
  box-shadow: -.0625em .125em .5em -.125em ${props => props.theme.inverseBg};
  text-indent: -999em;
  margin-left: .5em;
  `

class Menu extends Component {
  constructor() {
    super()

    this.state = {
      isOpen: false
    }
  }

  render() {
    return (
      <>
      <MenuToggle isOpen={this.state.isOpen} onClick={
        () => this.setState((prevState) => ({...prevState, isOpen: !prevState.isOpen}))
      }/>
      {
        this.state.isOpen ? <MenuContainerElem>
        <MenuContainerOverlayElem onClick={() => (this.setState({isOpen: false}))}/>
        <MenuNavElem>
          <H3>Settings</H3>
          <P>Theme</P>
          <ThemeManagementContext.Consumer>
            {(context) => (
              <>
                {
                  Object.keys(themes).map((val, index) => (
                    <ThemeToggleElem key={index} bgColor={themes[val].values.primaryBg} borderColor={themes[val].values.primary} onClick={() => context.updateTheme(themes[val])}><span>{val}</span></ThemeToggleElem>
                  ))
                }
              </>
            )}
          </ThemeManagementContext.Consumer>
        </MenuNavElem>
      </MenuContainerElem> : null
      }
      </>
    )
  }
}

export default Menu
