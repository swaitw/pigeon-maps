const webpack = require('webpack')
const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

var config = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './demo'),
  entry: {
    vendor: [
      'react',
      'react-dom'
    ],
    demo: isProd ? [
      './index.js'
    ] : [
      'webpack-dev-server/client?http://0.0.0.0:4040',
      'webpack/hot/only-dev-server',
      './index.js'
    ]
  },
  output: {
    path: path.join(__dirname, './docs'),
    publicPath: '/',
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(html|png)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: (isProd ? [] : ['react-hot']).concat([
          'babel-loader'
        ])
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve('./demo'),
      'node_modules'
    ],
    alias: {
      '~': path.join(__dirname, './demo'),
      'pigeon-maps': path.join(__dirname, './src')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ],
  devServer: {
    contentBase: './demo'
  }
}

module.exports = config
