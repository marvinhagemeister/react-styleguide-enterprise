import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import Preview from '../Preview';

const noop = () => {};

const code = '<button>OK</button>';

const expect = unexpected.use(unexpectedReact);

describe('Preview', () => {
  it('should render component renderer', () => {
    const actual = shallow(
			<Preview
				code={code}
				evalInContext={noop}
				/>
		);

    expect(actual.node, 'to contain exactly',
			<div>
				<div></div>
			</div>
		);
  });
});
