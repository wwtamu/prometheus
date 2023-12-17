const path = require('path');
const clone = require('js.clone');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');

import webpackConfig, { root, includeClientPackages } from './webpack.config';

export const commonPlugins = [
  new V8LazyParseWebpackPlugin(),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.AOT': true
  }),

  // Loader options
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),

  new webpack.NormalModuleReplacementPlugin(
    /facade(\\|\/)async/,
    root('node_modules/@angular/core/src/facade/async.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade(\\|\/)collection/,
    root('node_modules/@angular/core/src/facade/collection.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade(\\|\/)errors/,
    root('node_modules/@angular/core/src/facade/errors.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade(\\|\/)lang/,
    root('node_modules/@angular/core/src/facade/lang.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade(\\|\/)math/,
    root('node_modules/@angular/core/src/facade/math.js')
  ),

];
export const commonConfig = {
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js'
  },
};

// Client.
export const clientPlugins = [
  new BundleAnalyzerPlugin({
    // change it to `server` to view bundle stats
    analyzerMode: 'disabled',
    reportFilename: 'report.html',
    generateStatsFile: true,
    statsFilename: 'stats.json',
  }),

  new webpack.optimize.UglifyJsPlugin({
    // beautify: true,
    // mangle: false,
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_consts: true,
      // we need this for lazy v8
      negate_iife: false
    },
    sourceMap: false
  }),

  new webpack.NormalModuleReplacementPlugin(
    /@angular(\\|\/)upgrade/,
    root('empty.js')
  ),
  // problem with platformUniversalDynamic on the server/client
  new webpack.NormalModuleReplacementPlugin(
    /@angular(\\|\/)compiler/,
    root('empty.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /@angular(\\|\/)platform-browser-dynamic/,
    root('empty.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /dom(\\|\/)debug(\\|\/)ng_probe/,
    root('empty.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /dom(\\|\/)debug(\\|\/)by/,
    root('empty.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /src(\\|\/)debug(\\|\/)debug_node/,
    root('empty.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /src(\\|\/)debug(\\|\/)debug_renderer/,
    root('empty.js')
  ),

  // Waiting for https://github.com/ampedandwired/html-webpack-plugin/issues/446
  // new webpack.optimize.AggressiveSplittingPlugin({
  //   minSize: 30000,
  //   maxSize: 250000
  // }),

];
export const clientConfig = {
  entry: './src/client.aot',
  recordsOutputPath: root('webpack.records.json')
};

// Server.
export const serverPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    // beautify: true,
    // to ensure process.env still works
    mangle: false,
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      // we need this for lazy v8
      negate_iife: false
    },
    sourceMap: true
  }),
];
export const serverConfig = {
  entry: './src/server.aot',
  output: {
    filename: 'index.js',
    chunkFilename: '[id].bundle.js',
    crossOriginLoading: false
  },
};

export default [
  // Client
  webpackMerge(webpackConfig[0], clone(commonConfig), clientConfig, {
    plugins: webpackConfig[0].plugins.concat(commonPlugins, clientPlugins)
  }),
  // Server
  webpackMerge(webpackConfig[1], clone(commonConfig), serverConfig, {
    plugins: webpackConfig[1].plugins.concat(commonPlugins, serverPlugins)
  })
];
