import { assert as t } from 'chai';
import { readFileSync } from 'fs';
import styleguideLoader from '../loaders/styleguide.loader';

describe('loaders-styleguide', () => {
  it('should return valid, parsable JS', () => {
    const file = 'components/Button.js';
    const result = styleguideLoader.pitch.call({
      request: file,
      options: {
        styleguidist: {
          components: 'components/**/*.js',
          configDir: __dirname,
          getExampleFilename: () => 'Readme.md',
          getComponentPathLine: filepath => filepath,
        },
      },
    }, readFileSync(file, 'utf8'));
    t.isOk(result);
    t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
  });

  it('should return correct component paths: glob', () => {
    const file = 'components/Button.js';
    const result = styleguideLoader.pitch.call({
      request: file,
      options: {
        styleguidist: {
          components: 'components/**/*.js',
          configDir: __dirname,
          getExampleFilename: () => 'Readme.md',
          getComponentPathLine: filepath => filepath,
        },
      },
    }, readFileSync(file, 'utf8'));
    t.isOk(result);
    t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
    t.equalTrue(result.includes(`'filepath': "${__dirname}/components/Button/Button.js"`));
    t.equalTrue(result.includes(`'filepath': "${__dirname}/components/Placeholder/Placeholder.js"`));
  });

  it('should return correct component paths: function returning absolute paths', () => {
    const file = 'components/Button.js';
    const result = styleguideLoader.pitch.call({
      request: file,
      options: {
        styleguidist: {
          components: () => ([
            `${__dirname}/components/Button.js`,
            `${__dirname}/components/Placeholder.js`,
          ]),
          configDir: __dirname,
          getExampleFilename: () => 'Readme.md',
          getComponentPathLine: filepath => filepath,
        },
      },
    }, readFileSync(file, 'utf8'));
    t.isOk(result);
    t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
    t.equalTrue(result.includes(`'filepath': "${__dirname}/components/Button.js"`));
    t.equalTrue(result.includes(`'filepath': "${__dirname}/components/Placeholder.js"`));
  });

  it('should return correct component paths: function returning relative paths', () => {
    const file = 'components/Button.js';
    const result = styleguideLoader.pitch.call({
      request: file,
      options: {
        styleguidist: {
          components: () => ([
            'components/Button.js',
            'components/Placeholder.js',
          ]),
          configDir: __dirname,
          getExampleFilename: () => 'Readme.md',
          getComponentPathLine: filepath => filepath,
        },
      },
    }, readFileSync(file, 'utf8'));
    t.isOk(result);
    t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
    t.equalTrue(result.includes(`'filepath': "${__dirname}/components/Button.js"`));
    t.equalTrue(result.includes(`'filepath': "${__dirname}/components/Placeholder.js"`));
  });
});
