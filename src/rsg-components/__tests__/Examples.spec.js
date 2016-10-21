import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import Markdown from '../Markdown';
import Playground from '../Playground';
import Examples from '../Examples';

const expect = unexpected.use(unexpectedReact);

const examples = [
  {
    type: 'code',
    content: '<button>OK</button>',
    evalInContext: () => { },
  },
  {
    type: 'markdown',
    content: 'Hello *world*!',
  },
];

describe('Examples', () => {
  it('should render examples', () => {
    const actual = shallow(
			<Examples
				examples={examples}
				/>,
      {
        context: {
          codeKey: 1,
        },
      }
		);

    expect(actual.node, 'to contain',
			<Playground
				code={examples[0].content}
				evalInContext={examples[0].evalInContext}
				/>
		);
    expect(actual.node, 'to contain',
			<Markdown
				text={examples[1].content}
				/>
		);
  });
});
