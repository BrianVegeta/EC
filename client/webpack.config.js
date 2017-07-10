/* eslint comma-dangle: ["error",
 {"functions": "never", "arrays": "only-multiline", "objects":
 "only-multiline"} ] */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const config = {

  entry: {
    vendor: [
      'babel-polyfill',
      'es6-shim',
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      'sticky-position',
      'whatwg-fetch',
      'react',
      'redux',
      'lodash',
      'react-css-modules',
      'styled-components',
      'classnames/bind',
    ],
    app: [
      './app/startup/registration',
    ],
  },

  output: {
    filename: '[name]-bundle.js',
    // chunkFilename: '[name].bundle.[hash].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/assets/',
    path: path.resolve(__dirname, '../app/assets/webpack'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'spritesmith-generated'],
    alias: {
      styles: path.join(__dirname, 'app/styles'),
      components: path.join(__dirname, 'app/components'),
      layouts: path.join(__dirname, 'app/layouts'),
      lib: path.join(__dirname, 'app/lib'),
      propTypes: path.join(__dirname, 'app/propTypes'),
      actions: path.join(__dirname, 'app/actions'),
      containers: path.join(__dirname, 'app/containers'),
      constants: path.join(__dirname, 'app/constants'),
      models: path.join(__dirname, 'app/models'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    // new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new ExtractTextPlugin({ filename: '[name]-bundle.css', allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-bundle.js',
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, './app/sprite/srcImgs'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, '../app/assets/webpack/sprite.[hash].png'),
        css: path.resolve(__dirname, './app/sprite/sprite.styl')
      },
      apiOptions: {
        cssImageRef: '/assets/sprite.[hash].png'
      }
    })
  ],
  module: {
    rules: [
      {
        test: require.resolve('react'),
        use: {
          loader: 'imports-loader',
          options: {
            shim: 'es5-shim/es5-shim',
            sham: 'es5-shim/es5-sham',
          }
        },
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader' },
          ]
        }),
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                module: true,
                importLoaders: 1,
                localIdentName: '[folder]_[local]_[hash:base64:5]',
              }
            },
            {
              loader: 'sass-loader',
            }
          ]
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ]
        }),
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                module: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              }
            },
            {
              loader: 'stylus-loader',
            }
          ]
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000000000000000000,
          }
        },
      },
    ],
  },
};

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  );
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
