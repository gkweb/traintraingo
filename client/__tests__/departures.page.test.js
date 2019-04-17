import React from 'react'
import { shallow, mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import { themes } from './../lib/theme'
import Departure from '../pages/departures'
import 'jest-styled-components'
import { MockedProvider } from 'react-apollo/test-utils'

test('Departure Snapshot', () => {
  const c = shallow(<Departure />, { theme: themes.light.values })
  expect(c).toMatchSnapshot()
})
