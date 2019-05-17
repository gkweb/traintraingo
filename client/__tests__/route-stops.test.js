import React from 'react'
import { shallow, mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import { themes } from './../lib/theme'
import RouteStops, { STOPPING_PATTERN_QUERY } from '../components/route-stops'
import 'jest-styled-components'
import { MockedProvider } from 'react-apollo/test-utils'
import renderer from 'react-test-renderer'
import waitForExpect from 'wait-for-expect'

// Helps with Link.prefetch mocking
jest.mock('next/link', () => {
  return ({ children }) => {
    return children
  }
})

const MockPattern = {
  pattern: {
    departures: [
      {
        stop_id: '1071',
        scheduled_departure_utc: '2019-05-16T08:34:00Z',
        estimated_departure_utc: '2019-05-16T08:33:40Z',
        route_id: 5,
        direction_name: 'Mernda',
        stop_name: 'Flinders Street',
        stop_suburb: 'Melbourne City',
      },
      {
        stop_id: '1181',
        scheduled_departure_utc: '2019-05-16T08:37:00Z',
        estimated_departure_utc: '2019-05-16T08:37:48Z',
        route_id: 5,
        direction_name: 'Mernda',
        stop_name: 'Southern Cross',
        stop_suburb: 'Melbourne City',
      },
      {
        stop_id: '1068',
        scheduled_departure_utc: '2019-05-16T08:39:00Z',
        estimated_departure_utc: '2019-05-16T08:39:48Z',
        route_id: 5,
        direction_name: 'Mernda',
        stop_name: 'Flagstaff',
        stop_suburb: 'Melbourne City',
      },
    ],
  },
}

// Stops Mock
const mocks = [
  {
    request: {
      query: STOPPING_PATTERN_QUERY,
      variables: {
        run_id: 949743,
      },
    },
    result: {
      data: MockPattern,
    },
  },
]

// Dom node mock

function createNodeMock() {
  // You can return anything from this function.
  // For example:
  return {
    scrollLeft: () => {
      // Do nothing
    },
  }
}

// Displays station names once clicked
// Displays Loading when empty data is provided

test('Displays station names once clicked', async () => {
  const c = renderer.create(
    <ThemeProvider theme={themes.light.values}>
      <MockedProvider
        mocks={mocks}
        variables={{ run_id: 949743 }}
        addTypename={false}
        removeTypename
      >
        <RouteStops runId={949743} stopId={1068} />
      </MockedProvider>
    </ThemeProvider>,
    { createNodeMock }
  )

  c.root.findByType('button').props.onClick()

  await waitForExpect(() => {
    expect(JSON.stringify(c.toJSON())).toMatch('Flagstaff')
    expect(JSON.stringify(c.toJSON())).toMatch('Southern Cross')
    expect(JSON.stringify(c.toJSON())).toMatch('Flinders Street')
  })
})

test('Displays loading text', async () => {
  const c = renderer.create(
    <ThemeProvider theme={themes.light.values}>
      <MockedProvider
        mocks={[]}
        variables={{ run_id: 949743 }}
        addTypename={false}
        removeTypename
      >
        <RouteStops runId={949743} stopId={1068} />
      </MockedProvider>
    </ThemeProvider>
  )

  c.root.findByType('button').props.onClick()

  console.log(c.root)

  await waitForExpect(() => {
    expect(JSON.stringify(c.toJSON())).toMatch('Loading...')
  })
})

test('Run stopping pattern Snapshot', () => {
  const c = shallow(<RouteStops runId={949743} stopId={1068} />, {
    theme: themes.light.values,
  })
  expect(c).toMatchSnapshot()
})
