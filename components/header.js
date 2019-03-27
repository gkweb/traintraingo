import styled from 'styled-components'
import Logo from './../components/logo-no-text'
import Save from './../components/save'
import Link from 'next/link'
import { updateItem, removeItem, getItem } from './../helpers/local-storage'

const HeaderElem = styled.header`
  display: flex;
  flex-wrap: row wrap;
  align-items: center;
  padding: 2em 1em;
  width: 100%;
  height: 4em;
  border-bottom: 1px solid rgba(0, 0, 0, .25);
  background-color: #444;
  margin-bottom: 1em;
  position: fixed;
  top: 0;
  left: 0;

  @media screen and (min-width: 50em) {
    height: 6.625em;
  }
`

const TitleElem = styled.h1`
  margin: 0 0 0 .5em;
  color: white;
  font-size: 1.25em;

  @media screen and (min-width: 50em) {
    font-size: 2em;
  }
`

const LogoContainer = styled.div`
  max-width: 4em;
  margin: 0;

  @media screen and (max-width: 50em) {
    max-width: 3em;
  }
`

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      isSaved: false
    }

    this.handleSave = this.handleSave.bind(this)
  }

  handleSave(event) {
    this.setState({
      isSaved: !this.state.isSaved
    })

    if (this.state.isSaved) {
      // remove
      removeItem(this.props.stopId)
    } else {
      // save
      updateItem(this.props.stopId, this.props.headerTitle)
    }
  }

  componentDidMount() {
    const isSaved = (getItem(this.props.stopId))

    this.setState({
      isSaved: isSaved
    })
  }

  render() {
    const {
      headerTitle,
      stopId
    } = this.props

    return (
      <HeaderElem>
      <Link href={'/'} passHref prefetch>
        <a>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </a>
      </Link>
      {headerTitle ? <TitleElem>{headerTitle}</TitleElem> : null}
      {stopId ? <Save isSaved={this.state.isSaved} handler={this.handleSave} /> : null }
    </HeaderElem>
    )
  }
}

export default Header
