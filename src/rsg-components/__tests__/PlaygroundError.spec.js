import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import PlaygroundErrorRenderer from '../PlaygroundError';

const expect = unexpected.use(unexpectedReact);

describe('PlaygroundError', () => {
  it('renderer should render message', () => {
    const message = 'Hello *world*!';
    const actual = shallow(
			<PlaygroundErrorRenderer message={message} />
		);

    expect(actual.node, 'to contain',
			<pre>{message}</pre>
		);
  });
});
