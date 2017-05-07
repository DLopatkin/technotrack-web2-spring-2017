const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

  entry: {
    indexBundle: './index',
  },
  context: `${__dirname}/static_src/`,
  output: {
    path: `${__dirname}/static/build`,
    filename:'[name]-[hash].js',
    publicPath: '/static/build/',
  },

  module: {
    rules: [
      {
        test: /\.{js|jsx}$/,
        include: `${__dirname}/static_src`,
        loader: 'babel-loader?presets[]=react&presents[]=es2015&presets',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
      },
      {
        test: /\.{png|jpg|gif|svg|ttf|eot|woff|woff2}$/,
        loader: 'url-loader?limit=4096&&name=[path][name].[ext]',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
    ]
  },


  resolve: {
    modules: ['/static_src', 'node_modules'],
    extensions: ['.js', '.jsx', '.css'],
  },


  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.loader.js', '.js', '.css']
  },


  watch: NODE_ENV == 'development',

  devtool: NODE_ENV === 'development' ? 'cheap-module-inline-source-map' : false,
  plugins:[
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unsafe: true,
      },
    }),
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

};
