module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-fade-carousel/dist/'
    : '/',
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
}