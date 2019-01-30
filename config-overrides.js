const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
    config,
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#447de6",
      "@heading-color": "#0d0d11",
      "@body-background": "#eff2f7",
      "@text-color": "rgba(121, 126, 152, 0.82)",
      "@text-color - secondary": "rgba(121, 126, 152, 0.82)",
    },
    javascriptEnabled: true
  })(config, env);
  return config;
};