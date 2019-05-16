module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://39.107.127.240:3456',
        target: 'http://127.0.0.1:8100',
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/'
}