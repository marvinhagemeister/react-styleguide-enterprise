import { render } from 'enzyme';
import React from 'react';
import Markdown from '../Markdown';
import { assert as t } from 'chai';

describe('Markdown', () => {
  it('should render Markdown with custom CSS classes', () => {
    const markdown = `
# Header

Text with *some* **formatting** and a [link](/foo).

![Image](/bar.png)`;
    const actual = render(
			<Markdown text={markdown} />
		);
    const expected = render(
			<div>
				<h3 className="rsg-h3 rsg-font rsg-text-tag">Header</h3>
				<p className="rsg-p rsg-font rsg-text-tag">
					Text with <em className="rsg-em">some</em> <strong className="rsg-strong">
						formatting</strong> and a <a className="rsg-a link" href="/foo">link</a>.
			</p>
				<p className="rsg-p rsg-font rsg-text-tag">
					<img className="rsg-img" alt="Image" src="/bar.png" />
				</p>
			</div>
		);

    t.deepEqual(actual.html(), expected.html());
  });

  it('should render Markdown in span in inline mode', () => {
    const markdown = 'Hello *world*!';
    const actual = render(
			<Markdown text={markdown} inline />
		);
    const expected = render(
			<span className="rsg-base rsg-font">
				Hello <em className="rsg-em">world</em>!
			</span>
		);

    t.equal(actual.html(), expected.html());
  });
});
