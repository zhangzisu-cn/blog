/* eslint-disable @typescript-eslint/no-var-requires */
const os = require('os')
const { DefinePlugin } = require('webpack')
const gitRevision = require('git-revision')
const ciDetect = require('@npmcli/ci-detect')
const AsyncStylesheetWebpackPlugin = require('async-stylesheet-webpack-plugin')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'ZhangZisu.CN Blog',
    themeColor: '#1976d2',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/sw.js'
    }
  },
  configureWebpack: {
    plugins: [
      new AsyncStylesheetWebpackPlugin(),
      new DefinePlugin({
        GIT_HASH: JSON.stringify(gitRevision('hash')),
        GIT_BRANCH: JSON.stringify(gitRevision('branch')),
        BUILD_DATE: JSON.stringify((new Date()).toLocaleString()),
        BUILD_MACHINE: JSON.stringify(ciDetect() || os.hostname())
      })
    ]
  }
}
