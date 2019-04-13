import React from 'react'
import { shallow, mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import { themes } from './../lib/theme'
import Search from '../components/search'
import 'jest-styled-components'

const emptyHandler = () => console.log('null')

test('Search icon dissapears when focussed', () => {
  const c = mount(
    <ThemeProvider theme={themes.light.values}>
      <Search onSubmit={emptyHandler} onChange={emptyHandler} />
    </ThemeProvider>
  )

  // Simulate focus and blur to check toggling of SVG
  const input = c.find('input[type="text"]')
  input.simulate('focus')

  expect(c.find('svg').exists()).toBe(false)

  input.simulate('blur')

  expect(c.find('svg').exists()).toBe(true)
})

test('Search Snapshot', () => {
  const c = shallow(<Search onSubmit={emptyHandler} onChange={emptyHandler} />)
  expect(c).toMatchSnapshot()
})
