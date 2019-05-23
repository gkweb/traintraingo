import styled from 'styled-components'
import moment from 'moment'
import { DateTime, toRelative } from 'luxon'
import Disruption from './disruption'
import RouteStops from './route-stops'
import GoodService from './good-service'
import PropTypes from 'prop-types'

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'now',
    ss: 'now',
    m: '1 min',
    mm: '%d mins',
    h: '1 hr',
    hh: '%d hr',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
})

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

// Works out txt for fromNow
const estimatedTimeTxt = txt => {
  const isLessThanMin = /sec/gi
  // The updated txt
  let uTxt = ''

  if (isLessThanMin.test(txt)) {
    uTxt = 'Now'
  } else {
    uTxt = txt
    uTxt.replace('minutes', 'mins')
    uTxt.replace('a minute', '1 min')

    console.log(uTxt)
  }

  return uTxt
}

const ScheduledTimeElem = styled.span`
  display: inline-block;
  padding: 1.25em 1em;
  background: ${props => props.theme.primary};
  color: ${props => props.theme.primaryBg};
  border: 0.0625em solid ${props => props.theme[props.colorName]};
  border-right: 0.5em solid ${props => props.theme[props.colorName]};
  font-size: 2rem;
`

const ScheduledTime = ({ time }) => {
  let colorName = ''

  if (time === 'now') {
    colorName = 'highlightSecondary' // Orange
  } else if (/^(1\smin)/gi.test(time)) {
    colorName = 'highlightPrimary' // Yellow
  } else if (time === '--') {
    colorName = 'primary'
  } else {
    colorName = 'highlightTertiary'
  }

  return <ScheduledTimeElem colorName={colorName}>{time}</ScheduledTimeElem>
}

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
  const estimated = estimatedDep ? moment(estimatedDep).fromNow(true) : '--' // Estimates into the future are null

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
      <DepartingTimeElem>
        <ScheduledTime time={estimated} />
      </DepartingTimeElem>
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
