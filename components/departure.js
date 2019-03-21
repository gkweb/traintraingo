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

const Departure = ({lineName, directionName, platformNumber, scheduledDep}) => (
  <ContainerElem>
    <TitleElem>{lineName} Line</TitleElem>
    <InfoElem>To {directionName}</InfoElem>
    <InfoElem>Platform {platformNumber}</InfoElem>
    <InfoElem>Departing: {scheduledDep}</InfoElem>
  </ContainerElem>
)

export default Departure
