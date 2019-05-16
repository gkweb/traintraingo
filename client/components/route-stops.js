import { Component } from 'react'
import styled from 'styled-components'
import { H4 } from './text'
import { RefreshIcon } from './icon'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import moment from 'moment'

const Btn = styled.button`
  display: inline-block;
  vertical-align: middle;
  padding: 0.25rem;
  border: 0;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  text-align: center;
  background: none;
  color: inherit;
  transition: color 0.25s ease-in-out;
  cursor: pointer;
  border: 1px solid currentColor;
  border-radius: 15%;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
  }
`

const RefreshBtn = ({ onClick }) => (
  <Btn onClick={onClick} aria-label="Load route departures">
    <RefreshIcon />
  </Btn>
)

const TimeItem = styled.li`
  padding: 0.5em 1em;
  position: relative;
  text-align: center;

  &:before {
    content: ' ';
    display: block;
    position: absolute;
    top: -0.5em;
    right: calc(50% - 0.25em);
    height: 0.5em;
    width: 0.5em;
    background-color: ${props => props.theme.primary};
    border-radius: 50%;
  }

  &:after {
    content: ' ';
    display: block;
    height: 0.125em;
    position: absolute;
    top: -0.25em;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.primary};
  }

  &:first-child:after {
    left: 50%;
  }

  &:last-child:after {
    right: 50%;
  }
`

const Time = styled.span`
  display: block;
  font-size: 0.75rem;
`

const Station = styled.span`
  display: block;
  font-size: 0.75rem;
`

const TimeItemContainer = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  padding: 1em 0 0 0;
  position: relative;
  width: 100%;
  list-style: none;
`

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 0.5em;
`

const times = [
  {
    id: '1233CF',
    time: '10:30am',
    name: 'Richmond',
  },
  {
    id: '1233FF',
    time: '11:30am',
    name: 'Richmond',
  },
  {
    id: '1233FA',
    time: '12:30pm',
    name: 'Richmond',
  },
  {
    id: '126233FA',
    time: '12:30pm',
    name: 'Richmond',
  },
  {
    id: '12sdf33FA',
    time: '12:30pm',
    name: 'Richmond',
  },
  {
    id: '12hh33FA',
    time: '12:30pm',
    name: 'Richmond',
  },
  {
    id: '12zzz3FA',
    time: '12:30pm',
    name: 'Richmond',
  },
  {
    id: '1233FD',
    time: '13:30pm',
    name: 'Richmond',
  },
]

class RouteStops extends Component {
  constructor() {
    super()
    this.state = {
      loadRouteStops: false,
    }

    this.handleLoadStops = this.handleLoadStops.bind(this)
  }

  handleLoadStops() {
    console.log('has clicked')
    this.setState({
      loadRouteStops: true,
    })
  }

  render() {
    return (
      <>
        <H4>
          Route stops <RefreshBtn onClick={this.handleLoadStops} />
        </H4>
        {this.props.run_id}
        {this.state.loadRouteStops === true ? (
          <Query
            query={STOPPING_PATTERN_QUERY}
            variables={{ run_id: this.props.runId }}
          >
            {({ loading, error, data }) => {
              let r = null
              if (loading) return <span>Loading...</span>
              if (data) {
                {
                  console.log(data)
                }
                r = (
                  <Container>
                    <TimeItemContainer>
                      {console.log(data.pattern)}
                      {data.pattern.departures.map((val, index) => {
                        const scheduled = moment(
                          val.scheduled_departure_utc
                        ).format('HH:mm')
                        const estimated = val.estimated_departure_utc
                          ? moment(val.estimated_departure_utc).format('HH:mm')
                          : null // Estimates into the future are null

                        return (
                          <TimeItem key={index}>
                            <Time>{estimated ? estimated : scheduled}</Time>
                            <Station>{val.stop_name}</Station>
                          </TimeItem>
                        )
                      })}
                    </TimeItemContainer>
                  </Container>
                )
              } else if (error) {
                {
                  console.log(error)
                }
                r = <span>{'error loading content'}</span>
              }

              return r
            }}
          </Query>
        ) : null}
      </>
    )
  }
}

const STOPPING_PATTERN_QUERY = gql`
  query($run_id: Int!) {
    pattern(run_id: $run_id) {
      departures {
        stop_id
        scheduled_departure_utc
        estimated_departure_utc
        route_id
        direction_name
        stop_name
        stop_suburb
      }
    }
  }
`

export default RouteStops
