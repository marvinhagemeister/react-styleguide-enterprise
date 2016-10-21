const buildSrc = require('./build');
const serverSrc = require('./server');
const makeWebpackConfigSrc = require('./make-webpack-config');
const getConfig = require('./config');

/**
 * Initialize Styleguide API.
 *
 * @param {object} [config] Styleguidist config.
 * @returns {object} API.
 */
module.exports = function (config) {
  config = getConfig(config);

  /**
   * Build style guide.
   *
   * @param {Function} callback callback(err, config, stats).
   * @return {Compiler} Webpack Compiler instance.
   */
  function build(callback) {
    return buildSrc(config, (err, stats) => callback(err, config, stats));
  }

  /**
   * Start style guide dev server.
   *
   * @param {Function} callback callback(err, config).
   * @return {Compiler} Webpack Compiler instance.
   */
  function server(callback) {
    return serverSrc(config, err => callback(err, config));
  }

  /**
   * Return Styleguidist Webpack config.
   *
   * @param {string} [env=production] 'production' or 'development'.
   * @return {object}
   */
  function makeWebpackConfig(env) {
    return makeWebpackConfigSrc(config, env || 'production');
  }

  return {
    build,
    server,
    makeWebpackConfig
  };
};
