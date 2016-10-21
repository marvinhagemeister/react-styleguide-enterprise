import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import ComponentsListRenderer from '../ComponentsList';

const expect = unexpected.use(unexpectedReact);

const components = [
  {
    name: 'Button',
  },
  {
    name: 'Input',
  },
  {
    name: 'Textarea',
  },
];

describe('ComponentsList', () => {
  it('should render sections with nested components', () => {
    const actual = shallow(
			<ComponentsListRenderer items={components} />
		);

    expect(actual.node, 'to contain',
			<div>
				<div>Button</div>
				<div>Input</div>
				<div>Textarea</div>
			</div>
		);
  });
});
