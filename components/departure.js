import styled from 'styled-components'

const ContainerElem = styled.div`
  padding: 1em;
  width: 100%;
  border: 1px solid black;
  background: white;
`

const TitleElem = styled.h2`
  margin: 0 0 .75em;
`

const InfoElem = styled.p`
  margin: 0 0 1em;
`

const DepartingTimeElem = styled.p`
  font-size: 2em;
  margin: 0 0 1em;
`

const Departure = ({lineName, directionName, platformNumber, scheduledDep}) => (
  <ContainerElem>
    <TitleElem>To {directionName}</TitleElem>
    {lineName ?<InfoElem>Line: {lineName}</InfoElem> : null}
    <InfoElem>Platform {platformNumber}</InfoElem>
    <DepartingTimeElem>Departing: {scheduledDep}</DepartingTimeElem>
  </ContainerElem>
)

export default Departure
