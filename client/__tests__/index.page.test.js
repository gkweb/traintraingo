import React from 'react'
import { shallow, mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import { themes } from './../lib/theme'
import { create } from 'react-test-renderer'
import Index from '../pages/index'
import 'jest-styled-components'

test('Logo has Theme Context vals passed down to it', () => {
  const c = mount(
    <ThemeProvider theme={themes.light.values}>
      <Index />
    </ThemeProvider>
  )

  expect(c.find('circle[fill="#105C26"]').exists()).toBe(true)
})

test('Home / Index Snapshot', () => {
  const c = shallow(<Index />, { theme: themes.light.values })
  expect(expect(c).toMatchSnapshot()).toMatchSnapshot()
})
