import styled from 'styled-components'
import NextSeo from 'next-seo'
import { Query } from "react-apollo"
import gql from "graphql-tag"
import Link from 'next/link'
import debounce from 'lodash/debounce'
import {Main as MainElem, PageContainer} from './../components/layout'
import { ButtonElem } from './../components/button'
import {P as Blurb, H1 as Title} from './../components/text'

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

const SearchButton = styled(ButtonElem)`
  display: inline-block;
  padding: 1em;
  width: 5em;
`

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
`

const Main = styled(MainElem)`
  background: linear-gradient(to bottom, #1F79C3, #3890D2);
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
    this.setState({search: this.state.inputSearchTxt, initialRun: false})
  }

  handleSearch(event) {
    this.setState({inputSearchTxt: event.currentTarget.value})
    this.updateSearch()
  }

  render() {
    return (
    <PageContainer>
      <NextSeo
      config={{
        title: '==== >',
        description: '[][][]'
      }}
      />
      <Main>
        <Title>Find train station</Title>
        <ContentElem>
          <Search onSubmit={event => (event.preventDefault())} onChange={this.handleSearch} initialRun={this.state.initialRun}/>
          <Stops search_term={this.state.search} />
        </ContentElem>
      </Main>
    </PageContainer>
    )
  }
}

const Stops = (props) => (
  <Query
    query={gql`
    {
      stops(search_term: "${props.search_term}") {
        stops {
          stop_id
          stop_name
          departures {
            stop_id
            platform_number
            estimated_departure_utc
            scheduled_departure_utc
          }
        }
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (props.initialRun) return null
      if (props.search_term && props.search_term.length < 3) return null
      if (!data.stops) return null
      if (data.stops && data.stops.stops.length <= 0) return null
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      let v = null
      if (data.stops &&
        (((data.stops.stops || []).length > 0) && 
        typeof (data.stops || {}).stops === "object")) {
        v = data.stops.stops.map((stop, index) => (
          <StopButton key={index} href={`/departures/${stop.stop_id}`}>{stop.stop_name}</StopButton>
        ));
      } else {
        v = <div>Nothing found</div>
      }
      return v
    }}
  </Query>
);
