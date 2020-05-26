module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    // 接口代理
    proxy: {
      '/api': {
        target: 'http://localhost:3004',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // chainWebpack是与 html-webpack-plugin 插件配置相关的选项
  chainWebpack: config => {
    // 改变 htmlWebpackPlugin.options.title 变量的值为 Muke-Mall
    config.plugin('html').tap(options => {
      options[0].title= 'Muke-Mall'
      return options
    })
  },
  // 关闭 eslint校验
  lintOnSave: false
}