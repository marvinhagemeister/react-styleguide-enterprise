import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import { parse } from 'react-docgen';
import Code from '../Code';
import Markdown from '../Markdown';
import PropsRenderer from './PropsRenderer';
import { unquote, getType } from './util';
import { assert as t } from 'chai';

const expect = unexpected.use(unexpectedReact);

function render(propTypes, defaultProps = []) {
  const props = parse(`
		import { Component, PropTypes } from 'react';
		export default class Cmpnt extends Component {
			static propTypes = {
				${propTypes.join(',')}
			}
			static defaultProps = {
				${defaultProps.join(',')}
			}
			render() {
			}
		}
	`);
  return shallow(<PropsRenderer props={props.props} />);
}

describe('Props', () => {
  it('should render PropTypes.string', () => {
    const actual = render(['color: PropTypes.string']);

    expect(actual.node, 'to contain',
      <tr>
        <td><Code>color</Code></td>
        <td><Code>string</Code></td>
        <td></td>
        <td><div /></td>
      </tr>
    );
  });

  it('should render PropTypes.string with a default value', () => {
    const actual = render(['color: PropTypes.string'], ['color: "pink"']);

    expect(actual.node, 'to contain',
      <tr>
        <td><Code>color</Code></td>
        <td><Code>string</Code></td>
        <td><Code>pink</Code></td>
        <td><div /></td>
      </tr>
    );
  });

  it('should render PropTypes.string.isRequired', () => {
    const actual = render(['color: PropTypes.string.isRequired']);

    expect(actual.node, 'to contain',
      <tr>
        <td><Code>color</Code></td>
        <td><Code>string</Code></td>
        <td><span>Required</span></td>
        <td><div /></td>
      </tr>
    );
  });

  it('should render PropTypes.arrayOf', () => {
    const actual = render(['colors: PropTypes.arrayOf(PropTypes.string)']);

    expect(actual.node, 'to contain',
      <tr>
        <td><Code>colors</Code></td>
        <td><Code>string[]</Code></td>
        <td></td>
        <td><div /></td>
      </tr>
    );
  });

  it('should render PropTypes.instanceOf', () => {
    const actual = render(['num: PropTypes.instanceOf(Number)']);

    expect(actual.node, 'to contain',
      <tr>
        <td><Code>num</Code></td>
        <td><Code>Number</Code></td>
        <td></td>
        <td><div /></td>
      </tr>
    );
  });

  it('should render PropTypes.shape', () => {
    const actual = render(['foo: PropTypes.shape({bar: PropTypes.number.isRequired, baz: PropTypes.any})']);

    expect(actual.node, 'to contain',
      <tr>
        <td><Code>foo</Code></td>
        <td><Code>shape</Code></td>
        <td></td>
        <td>
          <div>
            <div>
              <Code>bar</Code>: <Code>number</Code> — <span>Required</span>
            </div>
            <div>
              <Code>baz</Code>: <Code>any</Code>
            </div>
          </div>
        </td>
      </tr>
    );
  });

  it('should render description in Markdown', () => {
    const actual = render(['/**\n * Label\n */\ncolor: PropTypes.string']);

    expect(actual.node, 'to contain',
      <tr>
        <td><Code>color</Code></td>
        <td><Code>string</Code></td>
        <td></td>
        <td><div><Markdown text="Label" /></div></td>
      </tr>
    );
  });

  it('should render unknown proptype for a prop when a relevant proptype is not assigned', () => {
    const actual = render([], ['color: "pink"']);

    expect(actual.node, 'to contain',
      <tr>
        <td><Code>color</Code></td>
        <td><Code>unknown</Code></td>
        <td><Code>pink</Code></td>
        <td><div /></td>
      </tr>
    );
  });

  it('unquote() should remove double quotes around the string', () => {
    const result = unquote('"foo"');
    t.equal(result, 'foo');
  });

  it('unquote() should remove single quotes around the string', () => {
    const result = unquote("'foo'");
    t.equal(result, 'foo');
  });

  it('unquote() should not remove quotes in the middle of the string', () => {
    const result = unquote('foo"bar');
    t.equal(result, 'foo"bar');
  });

  it('getType() should return .type or .flowType property', () => {
    const result = getType({
      type: 'foo',
      flowType: 'bar',
    });
    t.equal(result, 'bar');
  });
});

