const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package.json');

const siteUrl = (process.env.SITE_URL || packageJson.homepage || '').replace(/\/$/, '');
const siteRoot = siteUrl ? `${siteUrl}/` : '/';

class PublicStaticAssetsPlugin {
  constructor(options = {}) {
    this.siteUrl = options.siteUrl;
  }

  apply(compiler) {
    const pluginName = 'PublicStaticAssetsPlugin';
    const publicDir = path.resolve(__dirname, 'public');

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          for (const filename of fs.readdirSync(publicDir)) {
            if (filename === 'index.html') continue;

            const filePath = path.join(publicDir, filename);
            if (!fs.statSync(filePath).isFile()) continue;

            const isTextAsset = /\.(txt|xml)$/i.test(filename);
            const source = isTextAsset
              ? fs.readFileSync(filePath, 'utf8').replaceAll('__SITE_URL__', this.siteUrl)
              : fs.readFileSync(filePath);

            compilation.emitAsset(filename, new compiler.webpack.sources.RawSource(source));
          }
        }
      );
    });
  }
}

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        type: 'asset/resource',
        generator: { filename: 'images/[name].[hash:8][ext]' },
      },
      {
        test: /\.(mp4|webm|ogg|mov)$/i,
        type: 'asset/resource',
        generator: { filename: 'videos/[name].[hash:8][ext]' },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name].[hash:8][ext]' },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body',
      filename: 'index.html',
      siteRoot,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body',
      filename: '404.html',
      siteRoot,
    }),
    new PublicStaticAssetsPlugin({ siteUrl }),
  ],
};
