import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import ComponentsList from '../ComponentsList';
import TableOfContents from './TableOfContents';
import TableOfContentsRenderer from './TableOfContentsRenderer';

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

const sections = [
  {
    name: 'Introduction',
    content: 'intro.md',
  },
  {
    name: 'Buttons',
    components: [
      {
        name: 'Button',
      },
    ],
  },
  {
    name: 'Forms',
    components: [
      {
        name: 'Input',
      },
      {
        name: 'Textarea',
      },
    ],
  },
];

it('should render a renderer', () => {
  const actual = shallow(
    <TableOfContents components={components} sections={[]} />
  );

  expect(actual.node, 'to contain',
    <TableOfContentsRenderer
      items={<ComponentsList items={components} />}
      />
  );
});

it('should render renderer with sections with nested components', () => {
  const actual = shallow(
    <TableOfContents components={[]} sections={sections} />
  );

  expect(actual.node, 'to contain',
    <TableOfContentsRenderer
      items={
        <ComponentsList
          items={[
            { heading: true, name: 'Introduction', content: <ComponentsList items={[]} /> },
            { heading: true, name: 'Buttons', content: <ComponentsList items={sections[1].components} /> },
            { heading: true, name: 'Forms', content: <ComponentsList items={sections[2].components} /> },
          ]}
          />
      }
      />
  );
});

it('should filter list when search field contains a query', () => {
  const searchTerm = 'but';
  const actual = shallow(
    <TableOfContents components={components} sections={[]} />
  );

  actual.setState({ searchTerm });

  expect(actual.node, 'to contain',
    <TableOfContentsRenderer
      searchTerm={searchTerm}
      items={<ComponentsList items={[components[0]]} />}
      />
  );
});

it('should render a filtered list, should hide empty sections', () => {
  const searchTerm = 'inp';
  const actual = shallow(
    <TableOfContents components={[]} sections={sections} />
  );

  actual.setState({ searchTerm });

  expect(actual.node, 'to contain',
    <TableOfContentsRenderer
      items={
        <ComponentsList
          items={[
            { heading: true, name: 'Forms', content: <ComponentsList items={[sections[2].components[0]]} /> },
          ]}
          />
      }
      />
  );
});

it('should filter section names', () => {
  const searchTerm = 'frm';
  const actual = shallow(
    <TableOfContents components={[]} sections={sections} />
  );

  actual.setState({ searchTerm });

  expect(actual.node, 'to contain',
    <TableOfContentsRenderer
      items={
        <ComponentsList
          items={[
            { heading: true, name: 'Forms', content: <ComponentsList items={[]} /> },
          ]}
          />
      }
      />
  );
});
