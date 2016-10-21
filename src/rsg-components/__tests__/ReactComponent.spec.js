import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import Examples from '../Examples';
import Markdown from '../Markdown';
import Playground from '../Playground';
import ReactComponent from '../ReactComponent';
import ReactComponentRenderer from '../ReactComponentRenderer';

const noop = () => {};

const expect = unexpected.use(unexpectedReact);

const component = {
  name: 'Foo',
  pathLine: 'foo/bar.js',
  props: {
    description: 'Bar',
  },
  examples: [
    {
      type: 'code',
      content: '<button>OK</button>',
      evalInContext: noop,
    },
    {
      type: 'markdown',
      content: 'Hello *world*!',
    },
  ],
};

describe('ReactComponent', () => {
  it('should render component renderer', () => {
    const actual = shallow(
      <ReactComponent
        component={component}
        />
    );

    expect(actual.node, 'to contain',
      <ReactComponentRenderer
        name={component.name}
        pathLine={component.pathLine}
        description={<Markdown text={component.props.description} />}
        examples={<Examples examples={component.examples} />}
        />
    );
  });

  it('render should render component', () => {
    const actual = shallow(
      <ReactComponentRenderer
        name={component.name}
        pathLine={component.pathLine}
        description={component.props.description}
        examples={[
          <Playground
            code={component.examples[0].content}
            evalInContext={component.examples[0].evalInContext}
            />,
          <Markdown
            text={component.examples[1].content}
            />,
        ]}
        />
    );

    expect(actual.node, 'to contain',
      <h2>{component.name}</h2>
    );
    expect(actual.node, 'to contain',
      <div>{component.pathLine}</div>
    );
    expect(actual.node, 'to contain',
      <div>{component.props.description}</div>
    );
    expect(actual.node, 'to contain',
      <Playground
        code={component.examples[0].content}
        evalInContext={component.examples[0].evalInContext}
        />
    );
    expect(actual.node, 'to contain',
      <Markdown
        text={component.examples[1].content}
        />
    );
  });
});
