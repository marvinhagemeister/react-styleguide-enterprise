import { assert as t } from 'chai';
import examplesLoader from '../loaders/examples.loader';

describe('loader-examples', () => {
  it('should return valid, parsable JS', () => {
    const exampleMarkdown = `
# header

	const _ = require('lodash');
	<div/>

text

\`\`\`
<span/>
\`\`\`
`;
    const result = examplesLoader.call({}, exampleMarkdown);
    t.isOk(result);
    t.doesNotThrow(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
  });

  // componentName query option

  it('should replace all occurrences of __COMPONENT__ with provided query.componentName', () => {
    const exampleMarkdown = `
<div>
	<__COMPONENT__>
		<span>text</span>
		<span>Name of component: __COMPONENT__</span>
	</__COMPONENT__>
	<__COMPONENT__ />
</div>
`;

    const result = examplesLoader.call({ query: '?componentName=FooComponent' }, exampleMarkdown);
    t.notMatch(result, /__COMPONENT__/);
    t.match(result, /FooComponent/);
    t.equal(result.match(/FooComponent/g).length, 4);
  });
});
