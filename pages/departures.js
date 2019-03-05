import React, {Component} from 'react'
import { Query } from "react-apollo"
import gql from "graphql-tag"

const Stop = (props) => (
  <Query
    query={gql`
    {
      departures(stop_id: ${props.stop_id})  {
        departures {
          stop_id
          estimated_departure_utc
          scheduled_departure_utc
          platform_number
        }
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      console.log(data)

      let v = null
      if (data.departures && 
        ((data.departures.departures || []).length > 0)
      ) {
        v = data.departures.departures.map((departure, index) => {
          const scheduled_dep = new Date(departure.scheduled_departure_utc)
          const estimated_dep = new Date(departure.estimated_departure_utc)
          return (
            <div key={index}>
            <div>
              <li>Plat:{departure.platform_number}  {scheduled_dep.getHours()}:{scheduled_dep.getMinutes()}:{scheduled_dep.getSeconds()}</li>
            </div>
          </div>
          )
        })
      } else {
        v = <div>Nothing found</div>
      }

      return v
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
    return (<div>
      <h1>Station: </h1>
      <Stop stop_id={this.props.stop_id}/>
    </div>)
  }
}

export default Departures
