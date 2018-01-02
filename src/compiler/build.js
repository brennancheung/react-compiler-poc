// import spec from '../spec'
import copydir from 'copy-dir'
import path from 'path'
import webpack from 'webpack'

function build () {
  // 1. Copy the bootstrap to 'output' folder.
  const source = path.resolve(__dirname, 'bootstrap')
  const outputDest = path.resolve(__dirname, '../../output')
  copydir.sync(source, outputDest)

  // 2. Get the spec.

  // 3. Output new code from the spec into 'output' folder.

  // 4. Compile the app.
  const webpackConfig = require('../../output/webpack.config.js')
  const compiler = webpack(webpackConfig)
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
