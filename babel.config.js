module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    // needed for react native dotenv
    // plugins: [
    //   [
    //     'module:react-native-dotenv',
    //     {
    //       envName: 'APP_ENV',
    //       moduleName: '@env',
    //       path: '.env',
    //     },
    //   ],
    // ],
  };
};
