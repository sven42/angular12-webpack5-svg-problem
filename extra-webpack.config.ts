import { Configuration, DefinePlugin } from 'webpack';

/**
 * This is where you define your additional webpack configuration items to be appended to
 * the end of the webpack config.
 */
export default {
  plugins: [
    new DefinePlugin({
      APP_VERSION: "0815",
    }),
  ],
  module: {
    rules: [
      {test: /\.svg/, type: 'asset/resource'}
    ]
  }
} as Configuration;
