import styled from 'styled-components'
import NextSeo from 'next-seo'
import { Query } from "react-apollo"
import gql from "graphql-tag"
import Link from 'next/link'
import {Main as MainElem, PageContainer} from './../components/layout'
import {P as Blurb, H1 as Title} from './../components/text'

const StopButton = styled((props) => (<Link className={props.className} href={props.href} passHref><a>{props.children}</a></Link>))`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
  background-color: green;
  color: white;
`

const SearchButton = styled.button`
  display: inline-block;
  padding: 1em;
  width: 5em;
`

const SearchInput = styled.input`
  box-sizing: border-box;
  width: calc(100% - 5em);
  padding: 1em;
`

const Main = styled(MainElem)`
  background: linear-gradient(to right, #134e5e, #71b280);
`

const Search = (props) => (
  <form onSubmit={props.onSubmit}>
    <SearchInput name="search_field" type="text"/>
    <SearchButton type="submit">Search</SearchButton>
  </form>
)

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      search: '',
      stop_id: '',
    }

    this.handleStopsSearch = this.handleStopsSearch.bind(this)
  }

  handleStopsSearch(event) {
    event.preventDefault()
    this.setState({search: event.currentTarget['search_field'].value})
  }

  render() {
    return (
    <PageContainer>
      <NextSeo
      config={{
        title: '====',
        description: '[][][]'
      }}
      />
      <Search onSubmit={this.handleStopsSearch}/>
      <Stops search_term={this.state.search} />
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
      if (loading || (typeof data.stops !== "object")) return <p>Loading...</p>
      if (error) return <p>Error :(</p>;

      let v = null
      if (data.stops && 
        (((data.stops.stops || []).length > 0) && 
        typeof (data.stops || {}).stops === "object")) {
        v = data.stops.stops.map((stop, index) => (
          <div key={index}>
          {console.log(stop, Date.now())}
            <StopButton href={`/departures/${stop.stop_id}`}>{stop.stop_name}</StopButton>
          </div>
        ));
      } else {
        v = <div>Nothing found</div>
      }
      return v
    }}
  </Query>
);
