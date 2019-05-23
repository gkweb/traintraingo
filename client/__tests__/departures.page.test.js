import React from 'react'
import { shallow, mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import { themes } from './../lib/theme'
import Departures, { STOP_QUERY } from '../pages/departures'
import { STOPPING_PATTERN_QUERY } from '../components/route-stops'
import 'jest-styled-components'
import { MockedProvider } from 'react-apollo/test-utils'
import renderer from 'react-test-renderer'
import waitForExpect from 'wait-for-expect'

// Mutate deps
import * as localStorage from './../lib/fav-local-storage'
jest.mock('./../lib/fav-local-storage', () => ({
  updateItem: jest.fn(),
  removeItem: jest.fn(),
  getItem: jest.fn(),
}))

// Helps with Link.prefetch mocking
jest.mock('next/link', () => {
  return ({ children }) => {
    return children
  }
})

const MockStation = {
  stop: {
    stop_id: '1108',
    stop_name: 'Kensington',
    departures: [
      {
        stop_id: '1108',
        run_id: '12345',
        platform_number: 1,
        route_id: 3,
        direction_id: 1,
        estimated_departure_utc: '2019-04-23T09:05:00Z',
        scheduled_departure_utc: '2019-04-23T09:01:00Z',
        direction_name: 'City (Flinders Street)',
        disruptions: [
          {
            sid: 'FcKK908',
            title:
              'Craigieburn, Sunbury, Upfield, Werribee and Williamstown: No City Loop services on Saturday 4 May and Sunday 5 May 2019',
            description:
              'Craigieburn, Sunbury, Upfield, Werribee and Williamstown line trains will run direct to and from Flinders Street Station, not via the City Loop on Saturday 4 May and Sunday 5 May 2019.',
            url:
              'http://ptv.vic.gov.au/live-travel-updates/article/craigieburn-sunbury-upfield-werribee-and-williamstown-no-city-loop-services-on-saturday-4-may-and-sunday-5-may-2019',
            display_status: false,
            colour: '#ffd500',
          },
        ],
        run: {
          run_id: 12345,
          express_stop_count: 1,
          destination_name: 'Laverton',
        },
      },
      {
        stop_id: '1108',
        platform_number: 2,
        run_id: '12346',
        route_id: 3,
        direction_id: 2,
        estimated_departure_utc: '2019-04-23T09:20:00Z',
        scheduled_departure_utc: '2019-04-23T09:20:00Z',
        direction_name: 'Craigieburn',
        disruptions: [],
        run: {
          run_id: 12346,
          express_stop_count: 0,
          destination_name: 'Craigieburn',
        },
      },
    ],
  },
}

// Stops Mock
const mocks = [
  {
    request: {
      query: STOP_QUERY,
      variables: {
        stop_id: 1108,
      },
    },
    result: {
      data: MockStation,
    },
  },
]

test('Displays Loading text', () => {
  const c = mount(
    <ThemeProvider theme={themes.light.values}>
      <MockedProvider mocks={[]} addTypename={false} removeTypename>
        <Departures stop_id={1108} />
      </MockedProvider>
    </ThemeProvider>
  )

  expect(c.text()).toContain('Loading...')
})

test('Displays station name as text', async () => {
  const c = renderer.create(
    <ThemeProvider theme={themes.light.values}>
      <MockedProvider
        mocks={mocks}
        variables={{ stop_id: 1108 }}
        addTypename={false}
        removeTypename
      >
        <Departures stop_id={1108} />
      </MockedProvider>
    </ThemeProvider>
  )

  await waitForExpect(() => {
    expect(JSON.stringify(c.toJSON())).toMatch('Kensington')
  })
})

test('Departures Snapshot', () => {
  const c = shallow(<Departures stop_id={1108} />, {
    theme: themes.light.values,
  })
  expect(c).toMatchSnapshot()
})
