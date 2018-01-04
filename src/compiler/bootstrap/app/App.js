import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import plugins from './plugins'

import manager from './PluginManager'
import Navbar from './Navbar'

class App extends React.Component {
  componentWillMount () {
    plugins.forEach(plugin => manager.registerPlugin(plugin))
  }

  render () {
    const theme = createMuiTheme({
      palette: {
        type: this.props.theme
      }
    })

    const { getNavLinks, RouteMatcher } = manager

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Navbar links={getNavLinks()} component={<RouteMatcher />} />
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
