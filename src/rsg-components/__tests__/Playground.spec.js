import { shallow } from 'enzyme';
import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import React from 'react';
import noop from 'lodash/noop';
import Preview from '../Preview';
import Playground from '../Playground';
import PlaygroundRenderer from '../PlaygroundRenderer';

const expect = unexpected.use(unexpectedReact);
const code = '<button>OK</button>';

describe('Playground', () => {
	it('should render component renderer', () => {
		const actual = shallow(
			<Playground
				code={code}
				evalInContext={noop}
				/>,
			{
				context: {
					config: {
						showCode: false,
					},
				},
			}
		);

		expect(actual.node, 'to contain',
			<PlaygroundRenderer
				code={code}
				showCode={false}
				evalInContext={noop}
				/>
		);
	});

	it('renderer should render preview', () => {
		const actual = shallow(
			<PlaygroundRenderer
				code={code}
				showCode={false}
				evalInContext={noop}
				/>
		);

		expect(actual.node, 'to contain',
			<Preview code={code} />
		);
	});
});
