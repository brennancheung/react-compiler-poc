// import spec from '../spec'
import copydir from 'copy-dir'
import path from 'path'
import webpack from 'webpack'

import spec from '../spec'

const parseSpec = spec => {
  let commands = []

  const { plugins } = spec
  plugins.forEach(plugin => {
    plugin.routes.forEach(route => {
      commands.push({
        type: 'ADD_ROUTE',
        payload: {
          path: route.path,
          component: route.component,
        },
      })
    })
  })
  console.log(JSON.stringify(spec, null, 4))
  return commands
}

async function build () {
  console.log('Build started.')

  // 1. Copy the bootstrap to 'output' folder.
  console.log(`Copying bootstrap into 'output' folder.`)
  const source = path.resolve(__dirname, 'bootstrap')
  const outputDest = path.resolve(__dirname, '../../output')
  copydir.sync(source, outputDest)

  // 2. Get the spec.
  console.log(`Loading spec.`)

  // 3. Output new code from the spec into 'output' folder.
  const transformations = parseSpec(spec)
  console.log(JSON.stringify(transformations, null, 4))

  // 4. Compile the app.
  const webpackConfig = require('../../output/webpack.config.js')
  const compiler = webpack(webpackConfig)
  console.log('Starting webpack build.')
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.error('Error compiling application.')
      console.error(err)
    }

    console.log(stats.toString({
      chunks: false,
      colors: true
    }))

    // 5. Copy the static folder into the 'build' folder
    const staticSrc = path.resolve(__dirname, './bootstrap/app/static')
    const buildDest = path.resolve(__dirname, '../../build')
    copydir.sync(staticSrc, buildDest)
  })
}

build()
