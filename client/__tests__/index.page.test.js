import React from 'react'
import { shallow, mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import { themes } from './../lib/theme'
import Index, { STOPS_QUERY } from '../pages/index'
import 'jest-styled-components'
import { MockedProvider } from 'react-apollo/test-utils'

test('Logo has Theme Context vals passed down to it', () => {
  const c = mount(
    <ThemeProvider theme={themes.light.values}>
      <Index />
    </ThemeProvider>
  )

  expect(c.find('circle[fill="#105C26"]').exists()).toBe(true)
})

it('Should render loading state with empty result', () => {
  const component = mount(
    <ThemeProvider theme={themes.light.values}>
      <MockedProvider mocks={[]}>
        <Index />
      </MockedProvider>
    </ThemeProvider>
  )

  // Update input value
  component.find('App').setState({
    search: 'Flagstaff',
    initialRun: false,
  })

  expect(component.text()).toContain('Loading...')
})

test('Home / Index Snapshot', () => {
  const c = shallow(<Index />, { theme: themes.light.values })
  expect(c).toMatchSnapshot()
})
