import {Component} from 'react'
import styled from 'styled-components'
import {Menu as MenuIcon, Close as CloseIcon} from './icon'
import {H3, P} from './text'
import {themes, ThemeManagementProvider, ThemeManagementContext} from './../lib/theme'

const MenuTitleElem = styled.h2`
  font-size: 1em;
  margin: 0 0 .5rem;
  font-weight: normal;
  color: ${props => props.theme.primary};
`

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
  display: block;
  padding: .5em;
  width: 1.5em;
  background: none;
  padding: 0;
  border: 0;
  color: ${props => props.theme.secondary};
  ${props => (props.alignRight === true ? 'margin-left: auto;': null)}
`

const MenuToggle = ({onClick, isOpen, alignRight}) => (
  <MenuToggleElem onClick={onClick} alignRight={alignRight}>
    {isOpen ? <CloseIcon />: <MenuIcon />}
  </MenuToggleElem>
)

const ThemeToggleElem = styled.button`
  background: none;
  border: 0;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  background: linear-gradient(45deg, ${props => props.bgColor}, ${props => props.bgColor} 60%, ${props => props.borderColor} 61%, ${props => props.borderColor} 100%);
  border: 1px solid ${props => props.theme.primary};
  text-indent: -999em;
  margin-right: .5em;
  position: relative;

  &:after {
    content: ' ';
    display: block;
    top: -3px;
    left: -3px;
    bottom: -3px;
    right: -3px;
    position: absolute;
    border-radius: 50%;
    ${props => ((props.isActive === true) ? (`border: 1px solid ${props.theme.primary};`) : null )}
  }
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
          <MenuToggle alignRight={true} isOpen={this.state.isOpen} onClick={
            () => this.setState((prevState) => ({...prevState, isOpen: !prevState.isOpen}))
          }/>
          <MenuTitleElem>Settings</MenuTitleElem>
          <P>Theme</P>
          <ThemeManagementContext.Consumer>
            {(context) => (
              <>
                {
                  Object.keys(themes).map((val, index) => (
                    <ThemeToggleElem key={index} bgColor={themes[val].values.primaryBg} borderColor={themes[val].values.primary} isActive={(context.activeTheme === val)} onClick={() => context.updateTheme(themes[val])}><span>{val}</span></ThemeToggleElem>
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
