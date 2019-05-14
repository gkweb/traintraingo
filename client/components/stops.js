import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Link from 'next/link'

const StopsLoadingTextElem = styled.p`
  color: ${props => props.theme.primary};
`

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

const Stops = ({ search_term }) => {
  return (
    <Query query={STOPS_QUERY} variables={{ search_term }}>
      {({ loading, error, data }) => {
        if (error) return <p>Error :(</p>
        if (loading && (search_term && search_term.length >= 2))
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
                  key={stop.stop_id}
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

const STOPS_QUERY = gql`
  query($search_term: String!) {
    stops(search_term: $search_term) {
      stop_id
      stop_name
    }
  }
`
export { Stops, STOPS_QUERY }
