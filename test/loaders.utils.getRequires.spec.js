import { assert as t } from 'chai';
import getRequires, {
  REQUIRE_ANYTHING_BASE,
  REQUIRE_ANYTHING_REGEX,
  SIMPLE_STRING_REGEX,
} from '../loaders/utils/getRequires';

/* eslint-disable quotes */

// REQUIRE_ANYTHING_REGEX

const regex = new RegExp(REQUIRE_ANYTHING_BASE);

describe('loaders-utils-getRequires', () => {
  it('should match require invocations', () => {
    t.match(`require("foo")`, regex);
    t.match(`require ( "foo" )`, regex);
    t.match(`require('foo')`, regex);
    t.match(`require(foo)`, regex);
    t.match(`require("f" + "o" + "o")`, regex);
    t.match(`require("f" + ("o" + "o"))`, regex);
    t.match(`function f() { require("foo"); }`, regex);
  });

  it('should not match other occurrences of require', () => {
    t.notMatch(`"required field"`, regex);
    t.notMatch(`var f = require;`, regex);
    t.notMatch(`require.call(module, "foo")`, regex);
  });

  it('should match many requires in the same line correctly', () => {
    const replaced = `require('foo');require('bar')`.replace(REQUIRE_ANYTHING_REGEX, 'x');
    t.equal(replaced, 'x;x');
  });

  // SIMPLE_STRING_REGEX

  it('should match simple strings and nothing else', () => {
    const regex = SIMPLE_STRING_REGEX;

    t.match(`"foo"`, regex);
    t.match(`'foo'`, regex);
    t.match(`"fo'o"`, regex);
    t.match(`'fo"o'`, regex);
    t.match(`'.,:;!§$&/()=@^12345'`, regex);

    t.notMatch(`foo`, regex);
    t.notMatch(`'foo"`, regex);
    t.notMatch(`"foo'`, regex);

    // These 2 are actually valid in JS, but don't work with this regex.
    // But you shouldn't be using these in your requires anyway.
    t.notMatch(`"fo\\"o"`, regex);
    t.notMatch(`'fo\\'o'`, regex);

    t.notMatch(`"foo" + "bar"`, regex);
  });

  // getRequires

  it('should find calls to require in code', () => {
    t.deepEqual(getRequires(`require('foo')`), ['foo']);
    t.deepEqual(getRequires(`require('./foo')`), ['./foo']);
    t.deepEqual(getRequires(`require('foo');require('bar')`), ['foo', 'bar']);
    t.throws(() => getRequires(`require('foo' + 'bar')`), Error);
  });
});
