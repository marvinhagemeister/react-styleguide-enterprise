import { assert as t } from 'chai';
import styleguidist from '../scripts';

describe('scripts index', () => {
  it('should return API methods', () => {
    const api = styleguidist(require('./data/styleguide.config.js'));
    t.isOk(api);
    t.equal(typeof api.build, 'function');
    t.equal(typeof api.server, 'function');
    t.equal(typeof api.makeWebpackConfig, 'function');
  });

  it('makeWebpackConfig should return development Webpack config', () => {
    const api = styleguidist({ components: '*.js' });
    const result = api.makeWebpackConfig('development');
    t.isOk(result);
    t.equal(result.output.filename, 'build/bundle.js');
    t.isTrue(result.cache);
  });

  it('makeWebpackConfig should return production Webpack config', () => {
    const api = styleguidist({ components: '*.js' });
    const result = api.makeWebpackConfig('production');
    t.isOk(result);
    t.equal(result.output.filename, 'build/bundle.js');
    t.isFalse(result.cache);
  });
});
