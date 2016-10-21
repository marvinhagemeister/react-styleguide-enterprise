import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import Markdown from '../Markdown';
import MessageRenderer from '../Message';

const expect = unexpected.use(unexpectedReact);

describe('Message', () => {
  it('renderer should render message', () => {
    const message = 'Hello *world*!';
    const actual = shallow(
			<MessageRenderer>{message}</MessageRenderer>
		);

    expect(actual.node, 'to contain',
			<Markdown text={message} />
		);
  });
});
