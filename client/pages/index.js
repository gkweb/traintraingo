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

const StopButton = styled((props) => (<Link href={props.href} passHref><a className={props.className}>{props.children}</a></Link>))`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
  background-color: #333434;
  color: white;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
    background-color: #202121;
  }
`

const StopContainerElem = styled.div`
  margin-top: 1em;
  color: white;
`

const StopResultsTitle = styled.h3`
  margin-bottom: 1rem;
`

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
  background-color: #222;
  border: 1px solid #111;
  color: white;
  border-radius: .25em;
  font-size: 1.1em;

  &:focus {
    outline: 0;
  }
`

const DescriptionElem = styled.p`
  color: white;
  text-align: center;
  font-size: 1.25em;
`

const LogoContainer = styled.div`
  margin: 2em auto;
  max-width: 15em;
`

const FormElem = styled.form`
  display: block;
`

const ContentElem = styled.div`
  width: 100%;
  max-width: 50em;
  margin: 0 auto;
`

const Search = (props) => (
  <FormElem onSubmit={props.onSubmit}>
    <SearchInput name="search_field" type="text" onChange={props.onChange} autoComplete={'off'}/>
  </FormElem>
)

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
        title: 'Train Train Go - Train departures without the bloat.',
        description: 'Train train go'
      }}
      />
      <Main>
      <LogoContainer>
        <Logo />
      </LogoContainer>
        <ContentElem>
          <Search onSubmit={event => (event.preventDefault())} onChange={this.handleSearch} initialRun={this.state.initialRun}/>
          <Stops search_term={this.state.search} />
          <DescriptionElem>Melbourne, Australia train times with no bloat. Search, Select, then View departures.</DescriptionElem>
        </ContentElem>
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
      if (props.initialRun) return null
      if (loading) return <p>Loading...</p>
      if (!data.stops) return null
      if (data.stops && data.stops.length <= 0) return null

      let v = null
      if (data.stops &&
        (((data.stops || []).length > 0) &&
        typeof data.stops === "object")) {
        v = <StopContainerElem><StopResultsTitle>Results:</StopResultsTitle>{data.stops.map((stop, index) => (
          <StopButton key={index} href={`/departures/${stop.stop_id}`}>{stop.stop_name}</StopButton>
        ))}</StopContainerElem>;
      } else {
        v = <div>Nothing found</div>
      }
      return v
    }}
  </Query>
}
