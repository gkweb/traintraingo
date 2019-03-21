import styled from 'styled-components'
import * as moment from 'moment'

const ContainerElem = styled.div`
  padding: 1em;
  width: 100%;
  border: 1px solid black;
  background: white;
  box-shadow: 2px solid black -2px -2px;
`

const TitleElem = styled.h2`
  margin: 0 0 .75em;
`

const InfoElem = styled.p`
  margin: 0 0 1em;
`

const DepartingTimeElem = styled.p`
  font-size: 1.5em;
  margin: 0 0 .75em;
`

const PlatformElem = styled.p`
  font-size: 1.125em;
  margin: 0 0 1em;
`

const Departure = ({lineName, directionName, platformNumber, scheduledDep, estimatedDep}) => {
  const scheduled = moment(scheduledDep).format('hh:mm')
  const estimated = estimatedDep ? moment(estimatedDep).fromNow() : scheduled // Estimates into the future are null

  return (
  <ContainerElem>
    <TitleElem>To {directionName}</TitleElem>
    {lineName ?<InfoElem>Line: {lineName}</InfoElem> : null}
    <DepartingTimeElem>{estimated}</DepartingTimeElem>
    <PlatformElem>Platform {platformNumber}</PlatformElem>
    <InfoElem>Scheduled: {scheduled}</InfoElem>
  </ContainerElem>
  )
}

export default Departure
