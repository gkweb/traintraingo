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
  margin: 0 0 0.75em;
`

const InfoElem = styled.p`
  margin: 0;

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

const Departure = ({
  lineName,
  directionName,
  platformNumber,
  scheduledDep,
  estimatedDep,
  disruptions,
  runId,
}) => {
  const scheduled = moment(scheduledDep).format('HH:mm')
  const estimated = estimatedDep ? moment(estimatedDep).fromNow() : '-' // Estimates into the future are null

  return (
    <ContainerElem>
      <TitleElem>
        {scheduled} to {directionName}
      </TitleElem>
      {lineName ? <InfoElem>Line: {lineName}</InfoElem> : null}
      <DepartingTimeElem>{estimated}</DepartingTimeElem>
      <PlatformElem>
        Platform: {platformNumber ? platformNumber : '-'}
      </PlatformElem>
      <RouteStops runId={runId} />
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
}

export default Departure
