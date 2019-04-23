import React from 'react'
import { create } from 'react-test-renderer'
import Departure from '../components/departure'

const DepartureNoDisruptionProps = {
  lineName: 'Test Station',
  directionName: 'To City (Flinders Street)',
  platformNumber: 1,
  scheduledDep: '2019-04-23T07:04:51.448Z',
  estimatedDep: null,
  disruptions: [],
}

test('Departure Snapshot', () => {
  const c = create(<Departure {...DepartureNoDisruptionProps} />)
  expect(c.toJSON()).toMatchSnapshot()
})
