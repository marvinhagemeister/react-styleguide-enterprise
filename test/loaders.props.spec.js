import { assert as t } from 'chai';
import { readFileSync } from 'fs';
import path from 'path';
import propsLoader from '../loaders/props.loader';

describe('loaders-props', () => {
  it('should return valid, parsable JS', () => {
    const file = __dirname + '/components/Button/Button.js';
    const result = propsLoader.call({
      request: file,
      options: {
        styleguidist: {},
      },
    }, readFileSync(file, 'utf8'));
    t.isOk(result);
    t.doesNotThrow(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
  });

  it('should extract doclets', () => {
    const file = path.resolve(__dirname + '/components/Placeholder/Placeholder.js');
    const result = propsLoader.call({
      request: file,
      options: {
        styleguidist: {},
      },
    }, readFileSync(file, 'utf8'));
    t.isOk(result);
    t.doesNotThrow(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
    t.isTrue(result.includes('require("\\"examples!./examples.md\\"")'));
  });
});
