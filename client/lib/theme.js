import React, {Component} from 'react'
import {setCookie} from 'nookies'

const themes = {
  light: {
    'name': 'light',
    'values': {
      'primaryBg': '#f7f7f7',
      'secondaryBg': '#ddd',
      'tertiaryBg': '#bbb',
      'inversePrimaryBg': '#f7f7f7',
      'primary': '#4c4c4c',
      'secondary': '#9a9a9a',
      'tertiary': '#f7f7f7',
      'inversePrimary': '#4c4c4c',
      'highlightPrimary': '#EEDB57',
      'highlightSecondary': '#ffB86f',
      'highlightTertiary': '',
      'logoPrimaryBg': '#5EC64C',
      'logoSecondaryBg': '#105C26',
      'logoPrimary': '#4c4c4c',
      'logoSecondary': '#fff',
      'input': '#222',
      'inputBg': '#fff',
      'inputBorder': '#ccc',
      'inputIcon': 'rgb(76, 76, 76, .75)',
      'link': '#4495d4',
      'linkBg': '#f7f7f7',
      'linkHoverBg': '#fff'
    }
  },
  dark: {
    'name': 'dark',
    'values': {
      'primaryBg': '#444',
      'secondaryBg': '#333',
      'tertiaryBg': '#222',
      'inversePrimaryBg': '#fff',
      'primary': '#fff',
      'secondary': '#ddd',
      'tertiary': '#000',
      'inversePrimary': '#000',
      'highlightPrimary': '#EEDB57',
      'highlightSecondary': '#ffB86f',
      'highlightTertiary': '',
      'logoPrimaryBg': '#5EC64C',
      'logoSecondaryBg': '#105C26',
      'logoPrimary': '#fff',
      'logoSecondary': '#fff',
      'input': '#fff',
      'inputBg': '#222',
      'inputBorder': '#000',
      'inputIcon': 'rgba(255, 255, 255, .25)',
      'link': '#fff',
      'linkBg': '#333',
      'linkHoverBg': '#222'
    }
  }
}

const ThemeManagementContext = React.createContext({
    activeTheme: themes.light.name,
    theme: themes.light, // default value
    updateTheme: () => {}
  }
)

class ThemeManagementProvider extends Component {
  constructor() {
    super()
    this.state = {
      activeTheme: 'light',
      theme: themes.light,
      updateTheme: (theme) => {
        this.setState(prevState => ({
          ...prevState,
          'activeTheme': theme.name,
          'theme': theme
        }))
        setCookie({}, 'activeTheme', theme.name)
      }
    }
  }

  componentWillMount () {
    if (this.props.activeTheme && themes[this.props.activeTheme]) this.state.updateTheme(themes[this.props.activeTheme])
  }

  render () {
    const {children} = this.props
    return (
      <ThemeManagementContext.Provider value={this.state}>
        {children}
      </ThemeManagementContext.Provider>
    )
  }
}

export {
  themes,
  ThemeManagementContext,
  ThemeManagementProvider
}
