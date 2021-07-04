const path = require('path');
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    config.resolve.alias.set('@', path.resolve(__dirname, './src'))
    config.resolve.alias.set('@scss', path.resolve(__dirname, './src/scss'))
 
    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  pwa: {
    name: 'RedShape',
    themeColor: '#F1598D',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    workboxPluginMode: 'InjectManifest',
    manifestPath: 'manifest.json',
    workboxOptions: {
      swSrc: "src/service-worker.js",
    }
  },
  configureWebpack: {
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, "./src/service-worker.js")
      })
    ]
  }
}
