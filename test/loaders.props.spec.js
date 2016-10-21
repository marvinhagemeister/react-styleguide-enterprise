import { assert as t } from 'chai';
import { readFileSync } from 'fs';
import propsLoader from '../loaders/props.loader';

describe('loaders-props', () => {
  it('should return valid, parsable JS', () => {
    const file = 'components/Button.js';
    const result = propsLoader.call({
      request: file,
      options: {
        styleguidist: {},
      },
    }, readFileSync(file, 'utf8'));
    t.isOk(result);
    t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
  });

  it('should extract doclets', () => {
    const file = 'components/Placeholder.js';
    const result = propsLoader.call({
      request: file,
      options: {
        styleguidist: {},
      },
    }, readFileSync(file, 'utf8'));
    t.isOk(result);
    t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
    t.equalTrue(result.includes('require("\\"examples!./examples.md\\"")'));
  });
});
