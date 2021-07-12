const path = require('path');// 首先要引入node.js中path 模块，用于处理文件与目录的路径
const { name } = require('../package');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  devtool: 'source-map',
  entry: {// 指定入口文件
    main: './src/index',
  },
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(`./dist`),// 指定出口文件的路径目录
    publicPath: 'auto',
    library: `${name}`,
    libraryTarget: 'umd',
    globalObject: 'window'
  },
  resolve: {
    modules: ['../node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve('./src'),
      '@c': path.resolve('./src/components'),
    },
  },
  module: {//开始配置loader
    rules: [// 在webpack2中，loaders 被替换成了 rules 其实就是loader的规则
      {
        test: /\.(js|jsx)$/,//正则表达式，匹配模块的路径,该行表示匹配文件名为.js或者.jsx的文件
        use: [{
          loader: 'babel-loader?cacheDirectory',//babel-loader在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率,可以加上cacheDirectory参数或使用 transform-runtime 插件试试
        }],
        exclude: /node_modules/,//在进行项目打包的时候，当使用babel-loader进行js兼容时，不需要将node_modules模块下的所有js文件进行打包。
      },
      { // antd theme
        test: /\.(css|less)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#FF9052',
                },
                javascriptEnabled: true,
              }
            }
          }
        ],
        include: path.resolve('./src')
      },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: ['file-loader']
      },
    ],
  },
  optimization:{
    // splitChunks:{
    //   chunks: 'all',
    //   minSize: 20000,
    //   minRemainingSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 30,
    //   maxInitialRequests: 30,
    //   enforceSizeThreshold: 50000,
    //   cacheGroups: {
    //     reactVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       reuseExistingChunk: true,
    //       filename: 'reactVendors.js',
    //     },
    //     default: {
    //       test: /[\\/]node_modules[\\/]/,
    //       minChunks: 1,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //       filename: 'utils.js',
    //     },
    //   }
    // }
  },
  // externals: externalModules, // 排除打包文件
  plugins: [
    new HtmlWebpackPlugin({
      title: name,
      template: path.resolve('public/index.html'),
    }),
    // 插件配置
    new ModuleFederationPlugin({
      name: `${name}_remote`,	// 必传，且唯一，作为被依赖的key标志，依赖方使用方式 ${name}/${expose}
      library: { type: "umd", name: `${name}_remote` },		// library用于声明一个挂载的变量名（全局）,其中这里的 name 为作为 umd 的 name
      filename: `${name}_modules.js`,		// 构建后被依赖部分的入口文件名称
      exposes: {		// exposes暴露对外提供的modules模块
        './Button': "./src/components/button",
      },
      shared: { 
        "react": { 
          eager: true,
        }, 
        "react-dom": { 
          eager: true,
        } 
      },		// 声明共享的第三方依赖，声明后，依赖方使用时，优先使用依赖方自己的，如果没有使用被依赖方的
    }),
  ]
};
