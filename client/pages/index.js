import styled from 'styled-components'
import NextSeo from 'next-seo'
import Link from 'next/link'
import debounce from 'lodash/debounce'
import { PageContainer } from './../components/layout'
import Main from './../components/main'
import Logo from './../components/logo'
import Favourites from './../components/favourites'
import Search from './../components/search'
import Menu from './../components/menu'
import { Stops } from './../components/stops'

const MainElem = styled(Main)`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
`

const DescriptionElem = styled.p`
  color: ${props => props.theme.primary};
  text-align: center;
  font-size: 1em;
  margin-bottom: 0;

  @media screen and (min-width: 50em) {
    font-size: 1.125em;
  }
`

const LogoContainer = styled.div`
  padding: 1em 1em 0;
  margin: 1.5em auto 1em;
  max-width: 10em;

  @media screen and (min-width: 50em) {
    padding: 3em 1em 0;
    max-width: 15em;
    margin: 0 auto 3em;
  }
`

const ContentElem = styled.div`
  width: 100%;
  max-width: 25em;
  padding: 0 1em;
  margin: 0 auto;

  @media screen and (min-width: 50em) {
    max-width: 38em;
  }
`

const TopContentElem = styled.div`
  padding-bottom: 3em;

  @media screen and (min-width: 50em) {
    min-height: 60vh;
  }
`

const TopMenuContainerElem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  padding: 1em;
`

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      search: '',
      inputSearchTxt: '',
      stop_id: '',
      initialRun: true,
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.updateSearch = debounce(this.updateSearch, 500)
  }

  updateSearch(event) {
    this.setState({
      search: encodeURI(this.state.inputSearchTxt),
      initialRun: false,
    })
  }

  handleSearch(event) {
    this.setState({ inputSearchTxt: event.currentTarget.value.trim() })
    this.updateSearch()
  }

  render() {
    return (
      <PageContainer>
        <NextSeo
          config={{
            title:
              'Train Train Go 🚆🚆🚶 - Train departures without the bloat.',
            description: 'Train train go',
          }}
        />
        <MainElem>
          <TopMenuContainerElem>
            <Menu />
          </TopMenuContainerElem>
          <TopContentElem>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <ContentElem>
              <Search
                onSubmit={event => event.preventDefault()}
                onChange={this.handleSearch}
                initialRun={this.state.initialRun}
              />
              {this.state.search.length > 2 ? (
                <Stops search_term={this.state.search} />
              ) : (
                <DescriptionElem>
                  Melbourne, Australia PTV train departures with no bloat.
                </DescriptionElem>
              )}
            </ContentElem>
          </TopContentElem>
          <Favourites />
        </MainElem>
      </PageContainer>
    )
  }
}
