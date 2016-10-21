import { assert as t } from 'chai';
import { toCode, requireIt } from '../loaders/utils/js';

describe('loaders-utils js', () => {
  it('toCode() should convert JavaScript object to string', () => {
    const result = toCode({
      num: 42,
      drink: JSON.stringify('coffee'),
      js: n => n * n,
    });
    t.equal(result, "{'num': 42,\n'drink': \"coffee\",\n'js': function js(n) {\n\t\t\treturn n * n;\n\t\t}}");
  });

  it('toCode() should convert JavaScript array to string', () => {
    const result = toCode([
      42,
      JSON.stringify('coffee'),
      n => n * n,
    ]);
    t.equal(result, '[42,\n"coffee",\nfunction (n) {\n\t\treturn n * n;\n\t}]');
  });

  it('requireIt() should return a require statement', () => {
    const result = requireIt('foo');
    t.equal(result, 'require("foo")');
  });
});
