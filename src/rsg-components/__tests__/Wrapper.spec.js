import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import Wrapper from '../Wrapper';

const expect = unexpected.use(unexpectedReact);

it('should render children', () => {
  const children = <span>Hello</span>;
  const actual = shallow(
    <Wrapper>{children}</Wrapper>
  );

  expect(actual.node, 'to contain',
    children
  );
});
