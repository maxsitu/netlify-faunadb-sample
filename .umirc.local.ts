export default {
    proxy: {
      '/.netlify/functions/': {
        target: 'http://localhost:9000/',
        pathRewrite: {
          '^/\\.netlify/functions': ''
        }
      }
    }
}