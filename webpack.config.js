// TerserPluginをインポート
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // エントリーポイントを設定
  entry: "./src/index.ts",

  // 出力設定
  output: {
    path: `${__dirname}/dist`
  },

  // プロダクションモードを適用
  mode: "production",

  // ファイル解決設定
  resolve: {
    extensions: [".ts", ".js"]
  },

  // 開発サーバー設定
  devServer: {
    static: {
      directory: `${__dirname}/dist`
    },

    // サーバー起動時にブラウザを開く
    open: true
  },

  // モジュール設定
  module: {
    rules: [
      {
        // TypeScriptファイルに適用するルール
        test: /\.ts$/,
        loader: "ts-loader"
      }
    ]
  },

  // 最適化設定
  optimization: {
    minimizer: [
      // TerserPluginを使用してJavaScriptを圧縮
      new TerserPlugin({
        terserOptions: {
          format: {
            // コメントを削除
            comments: false,
          },
        },
        // コメントの抽出を無効化
        extractComments: false,
      }),
    ],
  },
}
