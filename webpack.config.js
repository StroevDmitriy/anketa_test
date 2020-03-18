const path = require('path')
const fs = require('fs')
const HTMLPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pug/pages`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  // baseUrl: ".",
  // paths: {
    // "~/*": ["./dist"],
  // },
  entry: [
    './src/js/main.js',
    './src/css/style.sass'
  ],
  output: {
    filename: './js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'dist'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './css/style.css'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            },
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }
        ]      
      },
      // {
      //   test:/\.(svg|jpg|png|gif)$/,
      //   use: [
      //     {
      //       loader:'file-loader',
      //       options: {
      //         publicPath: path.resolve(__dirname, 'src/img'),
      //         outputPath: 'dist/img',
      //         name: '[name].[ext]',
      //         esModule: false
      //       }
      //     }
      //   ],
      // },
    ],
  },
  plugins: [
    // new HTMLPlugin({
    //   filename: 'index.html',
    //   template: './src/index.pug'
    // }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),

    ...PAGES.map(page => new HTMLPlugin({
      template: `${PAGES_DIR}/${page}`, // .pug
      filename: `./${page.replace(/\.pug/,'.html')}` // .html
    }))
  ],
}