import { assert as t } from 'chai';
import path from 'path';
import getConfig from '../scripts/config';

describe('scripts config', () => {
  it('should read a config file', () => {
    const result = getConfig({ config: 'data/styleguide.config.js' });
    t.isOk(result);
    t.equal(result.title, 'React Style Guide Example');
  });

  it('should accept absolute path', () => {
    const result = getConfig({ config: path.join(__dirname, 'data/styleguide.config.js') });
    t.isOk(result);
    t.equal(result.title, 'React Style Guide Example');
  });

  it('should throw when config file not found', () => {
    const fn = () => getConfig({});
    t.throws(fn);
  });

  it('should accept config as an object', () => {
    const result = getConfig({
      components: '*.js',
    });
    t.isOk(result);
    t.equal(result.title, 'Style guide');
  });
});
