import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import Editor from '../Editor';

const expect = unexpected.use(unexpectedReact);

describe('Editor', () => {
  it('renderer should render editor', () => {
    const actual = shallow(
			<Editor code="Test" />
		);

    expect(actual.node, 'to contain', 'Test');
  });
});
