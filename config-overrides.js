const path = require('path')
module.exports = {
  webpack: function override(config, env) {
    config.resolve.alias = {
      'dva': 'dvajs',
      'antdKit':'./src/antdKit'
    }
    // config = rewireLess(config, env);
    // config = rewireCssModules(config, env);
    // console.log('object', config)
    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      return config;
    }
  }
};