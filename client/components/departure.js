import styled from 'styled-components'
import moment from 'moment'
import Disruption from './disruption'
import RouteStops from './route-stops'
import GoodService from './good-service'
import PropTypes from 'prop-types'

const ContainerElem = styled.div`
  padding: 1.5em 1em 1em;
  width: 100%;
  border: 1px solid ${props => props.theme.tertiaryBg};
  background: ${props => props.theme.inversePrimaryBg};
  color: ${props => props.theme.inversePrimary};
  box-shadow: -0.0625em 0.125em 0.5em -0.125em rgba(0, 0, 0, 0.125);
`

const TitleElem = styled.h2`
  margin: 0 0 0.25em;
`

const InfoElem = styled.p`
  margin: 0 0 1em;

  &:not(:last-child) {
    margin: 0 0 1em;
  }
`

const StopPattern = styled.p`
  margin: 0;
  font-size: 0.75em;

  &:not(:last-child) {
    margin: 0 0 1em;
  }
`

const DepartingTimeElem = styled.p`
  font-size: 1.5em;
  margin: 0 0 0.75em;
`

const PlatformElem = styled.p`
  font-size: 1.125em;
  margin: 0;

  &:not(:last-child) {
    margin: 0 0 1em;
  }
`

const ExpressTextElem = ({ count, destinationName }) => {
  let txt = ''

  if (count > 0 && count < 3) {
    txt = `Ltd express to ${destinationName}`
  } else if (count > 3) {
    txt = `Express to ${destinationName}`
  } else {
    txt = `All stations to ${destinationName}`
  }

  return <StopPattern>{txt}</StopPattern>
}

// const ScheduledTimeElem = styled.span`
//   display: block;
//   padding: .25em .5em;
//   background: ${props => props.theme}
// `

const Departure = ({
  lineName,
  directionName,
  platformNumber,
  scheduledDep,
  estimatedDep,
  disruptions,
  runId,
  stopId,
  expressStopCount,
  destinationName,
}) => {
  const scheduled = moment(scheduledDep).format('HH:mm')
  const estimated = estimatedDep ? moment(estimatedDep).fromNow(true) : '-' // Estimates into the future are null

  return (
    <ContainerElem>
      <TitleElem>
        {scheduled} to {directionName}{' '}
      </TitleElem>
      <ExpressTextElem
        count={expressStopCount}
        destinationName={destinationName}
      />
      {lineName ? <InfoElem>Line: {lineName}</InfoElem> : null}
      <DepartingTimeElem>{estimated}</DepartingTimeElem>
      <PlatformElem>
        Platform: {platformNumber ? platformNumber : '-'}
      </PlatformElem>
      <RouteStops runId={runId} stopId={stopId} />
      {disruptions && disruptions.length > 0 ? (
        <Disruption disruptionData={disruptions} />
      ) : (
        <GoodService />
      )}
    </ContainerElem>
  )
}

Departure.propTypes = {
  lineName: PropTypes.string,
  directionName: PropTypes.string,
  platformNumber: PropTypes.number,
  scheduledDep: PropTypes.string,
  estimatedDep: PropTypes.string,
  disruptions: PropTypes.array,
  runId: PropTypes.number,
  stopId: PropTypes.string,
  expressStopCount: PropTypes.number,
  destinationName: PropTypes.string,
}

export default Departure
