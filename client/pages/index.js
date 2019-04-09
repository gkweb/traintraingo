import styled from 'styled-components'
import NextSeo from 'next-seo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'
import debounce from 'lodash/debounce'
import { PageContainer } from './../components/layout'
import Main from './../components/main'
import Logo from './../components/logo'
import Favourites from './../components/favourites'
import Search from './../components/search'
import Menu from './../components/menu'

const StopButtonElem = styled.a`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
  background-color: ${props => props.theme.linkBg};
  color: ${props => props.theme.link};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
    background-color: ${props => props.theme.linkHoverBg};
  }
`

const MainElem = styled(Main)`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
`

const StopContainerElem = styled.div`
  padding-bottom: 2em;
  margin-top: 1em;
  color: ${props => props.theme.primary};
`

const StopResultsTitle = styled.h3`
  margin-bottom: 1rem;
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

const StopsLoadingTextElem = styled.p`
  color: ${props => props.theme.primary};
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

const Stops = props => {
  return (
    <Query
      query={gql`
    {
      stops(search_term: "${props.search_term}") {
        stop_id
        stop_name
      }
    }
    `}
    >
      {({ loading, error, data }) => {
        if (error) return <p>Error :(</p>
        if (loading && (props.search_term && props.search_term.length >= 2))
          return <StopsLoadingTextElem>Loading...</StopsLoadingTextElem>
        if (!data.stops) return null
        if (data.stops && data.stops.length <= 0) return null

        let v = null
        if (
          data.stops &&
          ((data.stops || []).length > 0 && typeof data.stops === 'object')
        ) {
          v = (
            <StopContainerElem>
              <StopResultsTitle>Results:</StopResultsTitle>
              {data.stops.map((stop, index) => (
                <Link
                  key={index}
                  href={`/departures/?stop_id=${stop.stop_id}`}
                  as={`/departures/${stop.stop_id}`}
                  passHref
                >
                  <StopButtonElem>{stop.stop_name}</StopButtonElem>
                </Link>
              ))}
            </StopContainerElem>
          )
        } else {
          v = <div>Nothing found</div>
        }
        return v
      }}
    </Query>
  )
}
