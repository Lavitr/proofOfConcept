const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
    },
    module: {
        rules: [
            { test: /\.css$/, use:['style-loader', 'css-loader']},
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader",
                    options: { minimize: true }
                  }
                ]
              }
        ]
    },
    externals: {
      config:  "config", 
  }
};
