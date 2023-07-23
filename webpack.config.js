const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const TestPlugin = require('./plugins/test-plugin')
const AuthorWebpackPlugin = require('./plugins/author-webpack-plugin')
const CleanWebpackPlugin = require('./plugins/clean-webpack-plugin')
const AnalyzeWebpackPlugin = require('./plugins/analyze-webpack-plugin')
const InlineChunkWebpackPlugin = require("./plugins/inline-chunk-webpack-plugin");
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    // clean: true
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: './loaders/test-loader.js'
      // },
      {
        test: /\.js$/,
        // 执行顺序：从右到左，从下到上
        // use: ['./loaders/demo/1-sync-loader.js', './loaders/demo/2-async-loader.js']
        // loader: './loaders/demo/3-raw-loader.js'
        // use: ['./loaders/demo/4-pitch-loader1', './loaders/demo/4-pitch-loader2', './loaders/demo/4-pitch-loader3'] // 执行顺序 pitch1 -> pitch2 -> pitch3 -> nomal3 -> nomal2 -> nomal1
        loader: "./loaders/clean-log-loader"
      },
      // {
      //   test: /\.js$/,
      //   loader: './loaders/author-loader',
      //   options: {
      //     author: 'Ink.Chen'
      //   }
      // },
      {
        test: /\.js$/,
        loader: './loaders/babel-loader',
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /.png|svg|gif|jpe?g$/,
        loader: './loaders/file-loader',
        type: 'javascript/auto'// 阻止webpack默认处理图片资源，只使用file-loader处理
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        // use: ['./loaders/style-loader'] // 单独使用自定义style 样式可以生效 但是对于一些图片资源 无法获取 此时需要借助css-loader
        use: ['./loaders/style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
    // new TestPlugin()
    new AuthorWebpackPlugin({
      author: 'Ink. Chen'
    }),
    new CleanWebpackPlugin(),
    new AnalyzeWebpackPlugin(),
    new InlineChunkWebpackPlugin([/runtime(.*)\.js/]),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
  },
  // mode: "development",
  mode: "production",
}