import React from 'react'
import 'jest-styled-components'
import { shallow, mount } from 'enzyme'
import Favourites from './../components/favourites'
import waitForExpect from 'wait-for-expect'

// Stops Mock
const mockData = {
  '1063': 'Epping Station',
  '1108': 'Kensington Station',
}

test('Favourites display when mock data is set (No local storage for unit test)', () => {
  const c = mount(<Favourites />)

  c.setState({
    favourites: mockData,
  })

  c.update()

  waitForExpect(() => expect(c.text()).toContain('Epping Station'))
})

test('Favourites Snapshot', () => {
  const c = shallow(<Favourites />)
  expect(c).toMatchSnapshot()
})
