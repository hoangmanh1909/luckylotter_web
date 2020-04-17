const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = (webpackConfig, env) => {

  webpackConfig.module.rules.forEach(item => {
    if (String(item.loader).indexOf('url-loader') > -1) {
      item.exclude.push(/\.svg$/)
    }
  })

  webpackConfig.module.rules = [
    ...webpackConfig.module.rules,
    ...[
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
      }
    ],
    
  ]

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new SpriteLoaderPlugin(({
      plainSprite: true,
      spriteAttrs: {
        id: '__SVG_SPRITE_NODE__'
      }
    })),
  ]);

  return webpackConfig;
}