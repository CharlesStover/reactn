const path = require('path');

const NODE_ENV =
  process.env.NODE_ENV ?
    process.env.NODE_ENV.trim() :
    'production';

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  entry: {
    index: './build/index.js',
  },
  externals: [
    '@types/react',
    'use-force-update', {
    'react': {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React',
      umd: 'react',
    },
  }],
  mode: NODE_ENV,
  module: {
    rules: [

      // TypeScript
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'index.js',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    library: 'reactn',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '.'),
    umdNamedDefine: true,
  },
  resolve: {
    alias: {
      '@types/react': path.resolve(__dirname, './node_modules/@types/react'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'use-force-update': path.resolve(__dirname, './node_modules/use-force-update'),
    },
  },
  watch: NODE_ENV === 'development',
};
