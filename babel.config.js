module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['module:@react-native/babel-preset'],
      ['@babel/preset-typescript', { jsxImportSource: 'nativewind' }], // For TS + NativeWind v4
      'nativewind/babel',
    ],
    plugins: [
      'react-native-reanimated/plugin', // ← Must be LAST
    ],
  };
};