import styled from 'styled-components'
import { H4 } from './text'

const TimeItem = styled.li`
  padding: 0.5em 1em;
  position: relative;

  &:before {
    content: ' ';
    display: block;
    position: absolute;
    top: -0.5em;
    right: calc(50% - 0.25em);
    height: 0.5em;
    width: 0.5em;
    background-color: red;
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
    background-color: red;
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

const RouteStops = () => (
  <>
    <H4>Arrivals</H4>
    <Container>
      <TimeItemContainer>
        {times.map(val => (
          <TimeItem key={val.id}>
            <Time>{val.time}</Time>
            <Station>{val.name}</Station>
          </TimeItem>
        ))}
      </TimeItemContainer>
    </Container>
  </>
)

export default RouteStops
