import React from 'react'
import 'jest-styled-components'
import { shallow } from 'enzyme'
import Menu from './../components/menu'
import { MockedProvider } from 'react-apollo/test-utils'
import renderer from 'react-test-renderer'

it('Should open menu when isOpen is set to true', () => {
  const c = renderer.create(<Menu />)
  const i = c.getInstance()

  // If the menu is open Settings text will be displayed at top
  i.setState(
    {
      isOpen: true,
    },
    () => {
      expect(JSON.stringify(c.toJSON())).toContain('Settings')
    }
  )
})

test('Menu Snapshot', () => {
  const c = shallow(
    <MockedProvider mocks={[]} addTypename={false}>
      <Menu />
    </MockedProvider>
  )
  expect(c).toMatchSnapshot()
})
