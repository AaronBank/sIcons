
module.exports = {
  devServer: {
    port: 9991,
    proxy: {
      '/api': {
        target: 'http://localhost:4843/',
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
