module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
      },
    },
    plugins: ['nativewind/babel', 'react-native-reanimated/plugin'],
  };
};
