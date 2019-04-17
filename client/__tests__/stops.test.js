import React from 'react'
import 'jest-styled-components'
import { shallow } from 'enzyme'
import { Stops, STOPS_QUERY } from './../components/stops'
import { MockedProvider } from 'react-apollo/test-utils'
import waitForExpect from 'wait-for-expect'
import renderer from 'react-test-renderer'

// Stops Mock
const mocks = [
  {
    request: {
      query: STOPS_QUERY,
      variables: {
        search_term: 'Flagstaff',
      },
    },
    result: {
      data: {
        stops: [
          {
            stop_id: '1068',
            stop_name: 'Flagstaff Station',
          },
        ],
      },
    },
  },
]

test('User can search and station name suggestion link is displayed', async () => {
  const c = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Stops search_term={'Flagstaff'} />
    </MockedProvider>
  )

  await waitForExpect(() => {
    expect(JSON.stringify(c.toJSON())).toMatch('Flagstaff Station')
  })
})

it('Should render loading state with empty result', () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <Stops search_term={'Flagstaff'} />
    </MockedProvider>
  )

  expect(JSON.stringify(component.toJSON())).toMatch('Loading...')
})

test('Home / Index Snapshot', () => {
  const c = shallow(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Stops search_term={'Flagstaff'} />
    </MockedProvider>
  )
  expect(c).toMatchSnapshot()
})
