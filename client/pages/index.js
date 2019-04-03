import styled from 'styled-components'
import NextSeo from 'next-seo'
import { Query } from "react-apollo"
import gql from "graphql-tag"
import Link from 'next/link'
import debounce from 'lodash/debounce'
import {PageContainer} from './../components/layout'
import Main from './../components/main'
import Logo from './../components/logo'
import Favourites from './../components/favourites'
import Search from './../components/search'

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
  font-size: 1.25em;
`

const LogoContainer = styled.div`
  padding: 3em 1em 0;
  margin: 0 auto 3em;
  max-width: 15em;
`

const ContentElem = styled.div`
  width: 100%;
  max-width: 50em;
  padding: 0 1em; 
  margin: 0 auto;
`

const TopContentElem = styled.div`
  min-height: 60vh;
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
      initialRun: true
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.updateSearch = debounce(this.updateSearch, 500)
  }

  updateSearch (event) {
    this.setState({search: encodeURI(this.state.inputSearchTxt), initialRun: false})
  }

  handleSearch(event) {
    this.setState({inputSearchTxt: event.currentTarget.value.trim()})
    this.updateSearch()
  }

  render() {
    return (
    <PageContainer>
      <NextSeo
      config={{
        title: 'Train Train Go 🚆🚆🚶 - Train departures without the bloat.',
        description: 'Train train go'
      }}
      />
      <Main>
        <TopContentElem>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <ContentElem>
            <Search onSubmit={event => (event.preventDefault())} onChange={this.handleSearch} initialRun={this.state.initialRun}/>
            {(this.state.search.length > 2) ? <Stops search_term={this.state.search} /> : <DescriptionElem>Melbourne, Australia train times with no bloat. Search, Select, then View departures.</DescriptionElem>}
          </ContentElem>
        </TopContentElem>
        <Favourites />
      </Main>
    </PageContainer>
    )
  }
}

const Stops = (props) => {
  return <Query
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
      if (error) return <p>Error :({console.log(error)}</p>
      if (loading && (props.search_term && props.search_term.length >= 2)) return (<StopsLoadingTextElem>Loading...</StopsLoadingTextElem>)
      if (!data.stops) return null
      if (data.stops && data.stops.length <= 0) return null

      let v = null
      if (data.stops &&
        (((data.stops || []).length > 0) &&
        typeof data.stops === "object")) {
        v = <StopContainerElem><StopResultsTitle>Results:</StopResultsTitle>{data.stops.map((stop, index) => (
          <Link key={index} href={`/departures/?stop_id=${stop.stop_id}`} as={`/departures/${stop.stop_id}`} passHref>
            <StopButtonElem>{stop.stop_name}</StopButtonElem>
          </Link>
        ))}</StopContainerElem>;
      } else {
        v = <div>Nothing found</div>
      }
      return v
    }}
  </Query>
}
