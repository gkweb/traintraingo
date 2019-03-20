import React, {Component} from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Header from './../components/header'
import Main from './../components/main'
import Logo from './../components/logo-no-text'
import { PageContainer } from './../components/layout'

// const Stop = (props) => (
//   <Query
//     query={gql`
//     {
//       stop(stop_id: ${props.stop_id}) {
//         stop_id
//         stop_name
//         departures {
//           stop_id
//           platform_number
//           estimated_departure_utc
//           scheduled_departure_utc
//         }
//       }
//     }
//     `}
//   >
//     {({ loading, error, data }) => {
//       if (loading) return <p>Loading...</p>
//       if (error) return <p>Error :(</p>

//       let v = null
//       if (data.departures && 
//         (data.departures.length > 0))
//         {
//         v = data.departures.map((departure, index) => {
//           const scheduled_dep = new Date(departure.scheduled_departure_utc)
//           const estimated_dep = new Date(departure.estimated_departure_utc)
//           return (
//             <div key={index}>
//             <div>
//               <li>{departure.stop_name} Plat:{departure.platform_number}  {scheduled_dep.getHours()}:{scheduled_dep.getMinutes()}:{scheduled_dep.getSeconds()}</li>
//             </div>
//           </div>
//           )
//         })
//       } else {
//         v = <div>Nothing found</div>
//       }

//       return (
//         <Main>
//         <Header headerTitle={data.stop_name} />
//           {v}
//         </Main>
//       )
//     }}
//   </Query>
// );

class Departures extends React.Component {
  static async getInitialProps({query}) {
    return {stop_id: query.stop_id}
  }

  constructor() {
    super()
  }

  render() {
    return (
      <h1>Blah</h1>
    // <Stop stop_id={this.props.stop_id}></Stop>
    )
  }
}

export default Departures
