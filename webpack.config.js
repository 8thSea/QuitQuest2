const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      // Customize the webpack config
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          '@react-native-firebase',
          '@stripe/stripe-react-native',
        ],
      },
    },
    argv
  );

  // Customize the config before returning it
  // Add polyfills for web
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
    '@react-native-firebase/app': './src/services/firebaseWebCompat.js',
    '@react-native-firebase/auth': './src/services/firebaseWebCompat.js',
    '@react-native-firebase/firestore': './src/services/firebaseWebCompat.js',
  };

  // Optimization for production
  if (env.mode === 'production') {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    };
  }

  // Add PWA support
  if (env.mode === 'production') {
    const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
    
    config.plugins.push(
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './public/service-worker.js',
        swDest: 'service-worker.js',
        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
      })
    );
  }

  return config;
};