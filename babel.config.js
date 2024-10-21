module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: ['nativewind/babel'],
  };
};
