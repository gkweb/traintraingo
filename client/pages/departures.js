import React, {Component} from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import NextSeo from 'next-seo'
import Header from './../components/header'
import Main from './../components/main'
import Departure from './../components/departure'
import Footer from './../components/footer'
import Loading from './../components/loading'

const DepartureUlElem = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin: 4em 0 0;
  padding: 1em;
  width: 100%;

  @media screen and  (min-width: 50em) {
    margin: 6.625em 0 0;
    justify-content: space-between;
    align-items: flex-start;
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
          direction_name
          disruptions {
            title
            description
            url
            display_status
            colour
          }
        }
      }
    }
    `}
  >
    {({ loading, error, data }) => {

      let v = null
      let stop_name = ''
      if (error) {
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
            return (
              <DepartureItemElem key={index}>
                <Departure directionName={departure.direction_name} platformNumber={departure.platform_number} scheduledDep={departure.scheduled_departure_utc} estimatedDep={departure.estimated_departure_utc} disruptions={departure.disruptions}/>
              </DepartureItemElem>
            )
            })}
          </DepartureUlElem>)
      } else {
        stop_name = 'No station found.'
        v = <p>Nothing found</p>
      }

      return (
        <>
        <NextSeo
          config={{
            title: `${stop_name} - Train train Go`,
            description: stop_name
          }}
        />
        {loading ? <Loading /> : (<Main>
          {data.stop_id}
        <Header headerTitle={stop_name} stopId={(error ? null : props.stop_id)} isLoading={loading}/>
          {v}
        <Footer/>
        </Main>)}
        </>
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
