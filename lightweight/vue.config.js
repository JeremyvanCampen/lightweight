module.exports = {
  pwa: {
    name: 'Lightweight',
    themeColor: '#1e1e1e',
    appleMobileWebAppCapable: 'yes',
    assetsVersion: '0.1.0',
    icons: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png',
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
};
