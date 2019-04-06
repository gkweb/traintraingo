import styled from 'styled-components'
import * as moment from 'moment'
import Disruption from './disruption'
import PropTypes from 'prop-types'

const ContainerElem = styled.div`
  padding: 1.5em 1em 1em;
  width: 100%;
  border: 1px solid ${props => props.theme.tertiaryBg};
  background: ${props => props.theme.inversePrimaryBg};
  color: ${props => props.theme.inversePrimary};
  box-shadow: -.0625em .125em .5em -.125em rgba(0,0,0,.125);
`

const TitleElem = styled.h2`
  margin: 0 0 .75em;
`

const InfoElem = styled.p`
  margin: 0;

  &:not(:last-child) {
    margin: 0 0 1em;
  }
`

const DepartingTimeElem = styled.p`
  font-size: 1.5em;
  margin: 0 0 .75em;
`

const PlatformElem = styled.p`
  font-size: 1.125em;
  margin: 0;

  &:not(:last-child) {
    margin: 0 0 1em;
  }
`

const Departure = ({lineName, directionName, platformNumber, scheduledDep, estimatedDep, disruptions}) => {
  const scheduled = moment(scheduledDep).format('HH:mm')
  const estimated = estimatedDep ? moment(estimatedDep).fromNow() : '-' // Estimates into the future are null

  return (
  <ContainerElem>
    <TitleElem>{scheduled} to {directionName}</TitleElem>
    {lineName ?<InfoElem>Line: {lineName}</InfoElem> : null}
    <DepartingTimeElem>{estimated}</DepartingTimeElem>
    <PlatformElem>Platform: {platformNumber ? platformNumber : '-'}</PlatformElem>
    <Disruption disruptionData={disruptions}/>
  </ContainerElem>
  )
}

Departure.propTypes = {
  lineName: PropTypes.string,
  directionName: PropTypes.string,
  platformNumber: PropTypes.number,
  scheduledDep: PropTypes.string,
  estimatedDep: PropTypes.string,
  disruptions: PropTypes.array
}

export default Departure
