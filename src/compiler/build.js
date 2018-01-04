import fs from 'fs'
import copydir from 'copy-dir'
import path from 'path'
import webpack from 'webpack'

import { camelize } from './bootstrap/app/util/fp'

// Generate the plugins.js file dynamically based on ENV.PLUGINS
const pluginsTemplate = plugins => {
  const importsList = plugins.map(plugin => `import ${camelize(plugin)} from '../../plugins/${plugin}'\n`).join('')
  const pluginsList = `const plugins = [${plugins.map(camelize).join(', ')}]`
  const template =
`${importsList}
${pluginsList}
export default plugins
`
  return template
}

async function build () {
  console.log('Build started.')

  // 1. Copy the bootstrap to 'output' folder.
  console.log(`Copying bootstrap into 'output' folder.`)
  const source = path.resolve(__dirname, 'bootstrap')
  const outputDest = path.resolve(__dirname, '../../output')
  copydir.sync(source, outputDest)

  // 2. Get the plugin list.
  console.log(`Loading plugin list.`)
  const plugins = process.env.PLUGINS.split(',')

  // 3. Generate JS code to import the plugins
  console.log('Generating plugins.js')
  const pluginsJS = pluginsTemplate(plugins)
  fs.writeFileSync(path.resolve(__dirname, '../../output/app/plugins.js'), pluginsJS)

  // 4. Compile the app.
  const webpackConfig = require('../../output/webpack.config.js')
  const compiler = webpack(webpackConfig)
  console.log('Starting webpack build.')
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.error('Error compiling application.')
      console.error(err)
    }

    // Show the webpack status
    console.log(stats.toString({
      colors: true,
      modules: false,
      version: false,
      // hash: false,
      // timings: false,
    }))

    // 5. Copy the static folder into the 'build' folder
    const staticSrc = path.resolve(__dirname, './bootstrap/app/static')
    const buildDest = path.resolve(__dirname, '../../build')
    copydir.sync(staticSrc, buildDest)
  })
}

build()
