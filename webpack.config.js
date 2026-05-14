// webpack.config.js
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // or 'development'
  entry: './src/index.js', // Entry file
  output: {
    filename: 'bundle.js', // Output bundle
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean old builds
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel to .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // Add other loaders here (e.g., CSS, images)
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 🔥 Remove all console.log, console.warn, etc.
          },
        },
      }),
    ],
  },
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
};
