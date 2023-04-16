module.exports = {
  entry: "./src/index.ts",

  output: {
    path: `${__dirname}/dist`
  },

  mode: "production",

  resolve: {
    extensions: [".ts", ".js"]
  },

  devServer: {
    static: {
      directory: `${__dirname}/dist`
    },

    open: true
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      }
    ]
  }
}
