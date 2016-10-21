import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import Section from '../Section';
import Sections from '../Sections';
import SectionsRenderer from '../SectionsRenderer';

const noop = () => { };

const expect = unexpected.use(unexpectedReact);

const sections = [
  {
    name: 'Foo',
    content: [
      {
        type: 'code',
        content: '<button>OK</button>',
        evalInContext: noop,
      },
    ],
    components: [],
  },
  {
    name: 'Bar',
    content: [
      {
        type: 'markdown',
        content: 'Hello *world*!',
      },
    ],
    components: [],
  },
];

it('should render component renderer', () => {
  const actual = shallow(
    <Sections sections={sections} />
  );

  expect(actual.node, 'to contain',
    <SectionsRenderer
      sections={[
        <Section section={sections[0]} />,
        <Section section={sections[1]} />,
      ]}
      />
  );
});

it('render should render component', () => {
  const actual = shallow(
    <SectionsRenderer
      sections={[
        <Section section={sections[0]} />,
        <Section section={sections[1]} />,
      ]}
      />
  );

  expect(actual.node, 'to contain',
    <Section section={sections[0]} />
  );
  expect(actual.node, 'to contain',
    <Section section={sections[1]} />
  );
});
