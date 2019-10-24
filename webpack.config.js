const webpack = require('webpack')
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); // добавили плагин

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
// указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
        },
     
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
             'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
             {
                 loader: 'image-webpack-loader',
                 options: { // ... }
             }
            }
        ]
        },
  {
    test: /\.css$/,
    use:  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // добавили минификацию CSS
       },
       
    ]
  },
  plugins: [ 
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
 }),
 
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css'
    }),
   
  new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
 }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),

    new WebpackMd5Hash()
  ],
  
};