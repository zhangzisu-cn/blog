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
  }
}
