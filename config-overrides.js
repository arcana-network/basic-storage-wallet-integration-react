// https://github.com/facebook/create-react-app/issues/11756#issuecomment-1114759896

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  webpack: (config, env) => {
    config.plugins.push(new NodePolyfillPlugin({
      excludeAliases: ['console']
    }))
    return config
  }
}
