const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Your Express.js server address
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // Remove /api from the request path
        },
      },
    },
  },
};

