import React, { Component } from 'react'
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
  padding: 0.75em 1em 0.5em;
  position: relative;
  text-align: center;

  &:after {
    content: ' ';
    display: block;
    position: absolute;
    top: -0.1875em;
    right: 50%;
    height: ${props => (props.isCurrentStop ? '1em' : '0.5em')};
    width: ${props => (props.isCurrentStop ? '1em' : '0.5em')};
    background: ${props =>
      props.isCurrentStop
        ? `${props.theme.primary}`
        : `
      radial-gradient(
        circle at center,
        ${props.theme.inversePrimaryBg},
        ${props.theme.inversePrimaryBg} 50%,
        ${props.theme.primary} 50.001%,
        ${props.theme.primary} calc(50% + 2px),
        ${props.theme.inversePrimaryBg} calc(50% + 3px)
      );
    `}
    background-size: 100%;
    border-radius: 50%;
    transform: translate(50%, -50%);
  }

  &:before {
    content: ' ';
    display: block;
    height: 0.125em;
    position: absolute;
    top: -0.25em;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.primary};
  }

  &:first-child:before {
    left: 50%;
  }

  &:last-child:before {
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
  scroll-behavior: smooth;
`

class RouteStops extends Component {
  constructor() {
    super()
    this.state = {
      loadRouteStops: false,
    }

    // Refs for scrolling
    this.currentStopRef = React.createRef()
    this.stopsContainRef = React.createRef()

    this.handleLoadStops = this.handleLoadStops.bind(this)
  }

  handleLoadStops() {
    this.setState({
      loadRouteStops: true,
    })
  }

  scrollCurrentStopIntoView() {
    if (this.currentStopRef)
      this.stopsContainRef.scrollLeft = this.currentStopRef.offsetLeft
  }

  render() {
    return (
      <>
        <H4>
          Route stops{' '}
          {!this.state.loadRouteStops ? (
            <RefreshBtn onClick={this.handleLoadStops} />
          ) : null}
        </H4>
        {this.state.loadRouteStops === true ? (
          <Query
            query={STOPPING_PATTERN_QUERY}
            variables={{ run_id: this.props.runId }}
            onCompleted={() => this.scrollCurrentStopIntoView()}
          >
            {({ loading, error, data }) => {
              let r = null
              if (loading || !data) return <span>Loading...</span>
              if (data) {
                r = (
                  <Container ref={ref => (this.stopsContainRef = ref)}>
                    <TimeItemContainer>
                      {data.pattern.departures.map((val, index) => {
                        const scheduled = moment(
                          val.scheduled_departure_utc
                        ).format('HH:mm')
                        const estimated = val.estimated_departure_utc
                          ? moment(val.estimated_departure_utc).format('HH:mm')
                          : null // Estimates into the future are null

                        const isCurrentStop = val.stop_id === this.props.stopId

                        return (
                          <TimeItem
                            key={index}
                            isCurrentStop={isCurrentStop}
                            ref={
                              isCurrentStop
                                ? ref => (this.currentStopRef = ref)
                                : null
                            }
                          >
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

export { STOPPING_PATTERN_QUERY }
export default RouteStops
