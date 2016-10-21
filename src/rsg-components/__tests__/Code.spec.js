import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import CodeRenderer from '../Code';

const expect = unexpected.use(unexpectedReact);

describe('Code', () => {
  it('renderer should render code', () => {
    const code = '<button>OK</button>';
    const actual = shallow(
			<CodeRenderer>{code}</CodeRenderer>
		);

    expect(actual.node, 'to contain',
			<code>{code}</code>
		);
  });
});
