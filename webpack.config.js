/*
  Project specific configuration for Webpack
 */


module.exports = function(env) {
  let webpack = require("webpack");
  let path = require("path");
  let ExtractTextPlugin = require("extract-text-webpack-plugin");

  let buildPath = path.resolve(__dirname, "./dist/webpack/");

  let client_plugins = [
    // Separate vendor libraries into separate chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: Infinity
    }),
    // Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),

    // This module is used for CSS Modules
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: false,
      allChunks: true
    })
  ];

  if (env.prod !== 1) {
    // Declare environment as development
    client_plugins.push(
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development")
      })
    );
  } else {
    // Declare environment as production
    client_plugins.push(
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      })
    );
    // Minimize the output files production
    client_plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false // Suppress uglification warnings
        },
        output: {
          comments: false
        },
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
      })
    );
    // Merge chunks in production
    client_plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  }

  let config = {
    target: "web",
    // Entry points to the project
    entry: {
      app: [
        "./src/entry.jsx"
      ],
      vendor: [
        "react"
      ]
    },
    // Config options on how to interpret requires imports
    resolve: {
      extensions: [".js", ".jsx"],
      symlinks: false
    },
    // Produce source-map in development
    devtool: env.prod === 1 ? "" : "source-map",
    output: {
      path: buildPath, // Path of output file
      publicPath: "./webpack/",
      filename: "[name].js", // Notice we use a variable
      chunkFilename: "[chunkhash].js"
    },
    plugins: client_plugins,
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/, // All .js and .jsx files
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          exclude: /\.inject\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use:
              "css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]"
          })
        }
      ]
    }
  };

  return (module.exports = config);
};
