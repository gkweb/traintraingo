import React, {Component} from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Header from './../components/header'
import Main from './../components/main'
import Logo from './../components/logo-no-text'
import { PageContainer } from './../components/layout'
import Departure from './../components/departure'

const DepartureUlElem = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
  width: 100%;

  @media screen and  (min-width: 50em) {
    justify-content: space-between;
  }
`

const DepartureItemElem = styled.li`
  display: flex;
  list-style: none;
  width: 100%;
  margin: 1em 0;

  @media screen and  (min-width: 50em) {
    width: calc(50% - 1em);
  }
`

const Stop = (props) => (
  <Query
    query={gql`
    {
      stop(stop_id: ${props.stop_id}) {
        stop_id
        stop_name
        departures {
          stop_id
          platform_number
          route_id
          direction_id
          estimated_departure_utc
          scheduled_departure_utc
        }
      }
    }
    `}
  >
    {({ loading, error, data }) => {

      let v = null
      let stop_name = 'loading...'
      if (loading) {
        v = <p>Loading...</p>
      } else if (error) {
        stop_name = 'Error!'
        v = <p>Error, Something happened.</p>
      } else if (
        data.stop && 
        data.stop.departures && 
        (data.stop.departures.length > 0))
        {
          stop_name = `${data.stop.stop_name} Station`
          v = (
          <DepartureUlElem>
            {data.stop.departures.map((departure, index) => {
            const scheduled_dep = new Date(departure.scheduled_departure_utc)
            const estimated_dep = new Date(departure.estimated_departure_utc)
            return (
              <DepartureItemElem key={index}>
                <Departure lineName={'Mernda'} directionName={'City'} platformNumber={departure.platform_number} scheduledDep={`${scheduled_dep.getHours()}:${scheduled_dep.getMinutes()}:${scheduled_dep.getSeconds()}`} />
              </DepartureItemElem>
            )
            })}
          </DepartureUlElem>)
      } else {
        stop_name = 'No station found.'
        v = <p>Nothing found</p>
      }

      return (
        <Main>
        <Header headerTitle={stop_name} />
          {v}
        </Main>
      )
    }}
  </Query>
);

class Departures extends React.Component {
  static async getInitialProps({query}) {
    return {stop_id: query.stop_id}
  }

  constructor() {
    super()
  }

  render() {
    return (
      <Stop stop_id={this.props.stop_id}></Stop>
    )
  }
}

export default Departures
