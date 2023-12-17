let path = require('path');
let clone = require('js.clone');
let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let CopyWebpackPlugin = require('copy-webpack-plugin');

export let commonPlugins = [
  new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
    root('./src'),
    {
      // your Angular Async Route paths relative to this root directory
    }
  ),
  // Copy resources
  new CopyWebpackPlugin([
    {
      from: path.join(__dirname, 'node_modules', 'font-awesome', 'fonts'),
      to: path.join('assets', 'fonts')
    },
    {
      from: path.join(__dirname, 'resources', 'images'),
      to: path.join('assets', 'images')
    },
    {
      from: path.join(__dirname, 'resources', 'i18n'),
      to: path.join('assets', 'i18n')
    }
  ]),
  // Loader options
  new webpack.LoaderOptionsPlugin({
    options: {
      tslint: {
        emitErrors: false,
        failOnHint: false
      },
    }
  })
];
export let commonConfig = {
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.json'
    ],
    modules: [
      root('node_modules')
    ]
  },
  context: __dirname,
  output: {
    publicPath: '',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      }, {
        test: /\.html$/,
        use: 'raw-loader'
      }, {
        test: /\.css$/,
        use: [
          'raw-loader',
        ]
      }, {
        test: /\.json$/,
        use: 'json-loader'
      }, {
        enforce: 'pre',
        test: /\.ts?$/,
        use: 'tslint-loader',
        exclude: /(node_modules)/,
      }
    ]
  },
  plugins: [
    // Use commonPlugins.
  ]
};

// Client.
export let clientPlugins = [

];
export let clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: root('dist/client')
  },
  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};

// Server.
export let serverPlugins = [

];
export let serverConfig = {
  target: 'node',
  // use the entry file of the node server if everything is ts rather than es5
  entry: './src/server',
  output: {
    filename: 'index.js',
    path: root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { test: /@angular(\\|\/)material/, use: "imports-loader?window=>global" }
    ],
  },
  externals: includeClientPackages(
    /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|-angular2|-ng2|-ng/
  ),
  node: {
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

export default [
  // Client
  webpackMerge(clone(commonConfig), clientConfig, {
    plugins: clientPlugins.concat(commonPlugins)
  }),
  // Server
  webpackMerge(clone(commonConfig), serverConfig, {
    plugins: serverPlugins.concat(commonPlugins)
  })
];


// Helpers

export function includeClientPackages(packages, localModule?: string[]) {
  return function(context, request, cb) {
    if (localModule instanceof RegExp && localModule.test(request)) {
      return cb();
    }
    if (packages instanceof RegExp && packages.test(request)) {
      return cb();
    }
    if (Array.isArray(packages) && packages.indexOf(request) !== -1) {
      return cb();
    }
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      return cb(null, 'commonjs ' + request);
    }
    return cb();
  };
}

export function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
