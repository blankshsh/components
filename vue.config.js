const target = 'https://baidu.com'

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8888,
    hotOnly: true,
    proxy: {
      '/api': {
        target,
        changeOrigin: true
      }
    }
  }
}
