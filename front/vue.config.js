module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.107.127.240:3456',
        changeOrigin: true
      }
    }
  }
}