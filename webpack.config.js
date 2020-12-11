const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const common = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?modules', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    // workaround for https://github.com/palantir/blueprint/issues/3739
    new webpack.DefinePlugin({
      'process.env': '{}',
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },

  performance: {
    hints: false,
  },
};

module.exports = (env, argv) => {
  const mode = argv.mode || 'production';
  return {
    mode: mode,
    ...common,
    ...(mode === 'development' && {
      devtool: 'cheap-module-source-map',

      devServer: {
        port: 3000,
        hot: true,
      },
    }),
    ...(mode === 'production' && {
      devServer: {
        port: 3001,
        // TODO: production では liveReload を無効にする
      },
    }),
  };
};
