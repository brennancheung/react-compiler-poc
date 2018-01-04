import React from 'react'
import { flatten } from 'lodash'

import {
  Link,
  Switch,
  Route
} from 'react-router-dom'

import {
  onlyKeys,
  pluck
} from './util/fp'

const renderPageLink = (page, idx) => (
  <li key={idx}><Link to={page.link}>{page.name}</Link></li>
)

const renderPageRoute = (page, idx) => {
  const routeParams = {
    path: page.link,
    exact: !!page.exactMatch,
    component: page.component
  }
  return <Route key={idx} {...routeParams} />
}

const renderEventHandler = (plugin, idx) => {
  const Handler = plugin.eventHandlerComponent
  return Handler ? <Handler key={idx} /> : null
}

function PluginManager () {
  let plugins = []

  const getAllPages = () => flatten(plugins.map(pluck('pages')))

  return {
    getNavLinks: () => getAllPages().map(onlyKeys('link', 'name')),

    registerPlugin: (plugin) => {
      const existingPluginNames = plugins.map(pluck('name'))
      if (existingPluginNames.includes(plugin.name)) {
        console.info(`Skipping plugin ${plugin.name} because it is already registered`)
        return
      }
      plugins.push(plugin)
    },

    RouteMatcher: () => (
      <Switch>
        {getAllPages().map(renderPageRoute)}
      </Switch>
    ),

    NavLinks: () => (
      <ul>
        {getAllPages().map(renderPageLink)}
      </ul>
    ),

    EventHandlers: () => (
      <div>
        {plugins.map(renderEventHandler)}
      </div>
    )
  }
}

const manager = PluginManager()

export default manager
