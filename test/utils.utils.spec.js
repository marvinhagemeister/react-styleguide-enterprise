import { assert as t } from 'chai';
const map = require('lodash/map');
import * as utils from '../src/utils/utils';

const COMPONENTS = [
  {
    name: 'Button',
  },
  {
    name: 'Image',
  },
  {
    name: 'Input',
  },
  {
    name: 'Link',
  },
  {
    name: 'Textarea',
  },
];

const SECTIONS = [
  {
    name: 'General',
    sections: [
      {
        name: 'Particles',
        components: [
          {
            name: 'Button',
          },
          {
            name: 'Image',
          },
        ],
      },
    ],
  },
];

let sourceGlobalLength;

// setComponentsNames

describe('utils', () => {
  beforeEach(() => {
    sourceGlobalLength = Object.keys(global).length;
  });

  afterEach(() => {
    delete global.Foo;
    delete global.Bar;
  });

  it('should set name property to each component', () => {
    const result = utils.setComponentsNames([
      {
        module: {
          displayName: 'Foo',
        },
      },
      {
        module: {
          name: 'Bar',
        },
      },
      {
        module: {
          displayName: 'Foo',
        },
        props: {
          displayName: 'FooOverride',
        },
      },
    ]);
    t.deepEqual(map(result, 'name'), ['Foo', 'Bar', 'FooOverride']);
  });

	// globalizeComponents

  it('should set each component’s module as a global variable', () => {
    utils.globalizeComponents([
      {
        name: 'Foo',
        module: 13,
      },
      {
        name: 'Bar',
        module: 27,
      },
      {
        name: 'PathedFoo',
        module: { a: 32 },
        props: {
          path: 'a',
        },
      },
    ]);
    t.equal(Object.keys(global).length, sourceGlobalLength + 2);
    t.equal(global.Foo, 13);
    t.equal(global.Bar, 27);
    t.equal(global.PathedFoo, 32);
  });

	// getFilterRegExp

  it('should return a RegExp', () => {
    const result = utils.getFilterRegExp('');
    t.ok(result instanceof RegExp);
  });

  it('RegExp should fuzzy match a string', () => {
    const result = utils.getFilterRegExp('btn');
    t.match('button', result);
  });

  it('RegExp should not match when string is different', () => {
    const result = utils.getFilterRegExp('buttons');
    t.notMatch('button', result);
  });

  it('should not throw when query contains special characters', () => {
    const fn = () => utils.getFilterRegExp('\\');
    t.doesNotThrow(fn);
  });

  it('RegExp should ignore non-alphanumeric characters', () => {
    const result = utils.getFilterRegExp('#$b()tn');
    t.match('button', result);
  });

	// filterComponentsByName

  it('should return initial list with empty query', () => {
    const result = utils.filterComponentsByName(COMPONENTS, '');
    t.deepEqual(result, COMPONENTS);
  });

  it('should return filtered list, should ignore case', () => {
    const result = utils.filterComponentsByName(COMPONENTS, 'button');
    t.deepEqual(result, [{ name: 'Button' }]);
  });

  it('should return empty list when nothing found', () => {
    const result = utils.filterComponentsByName(COMPONENTS, 'pizza');
    t.deepEqual(result, []);
  });

	// filterComponentsByExactName

  it('should return components with exact name', () => {
    const result = utils.filterComponentsByExactName(COMPONENTS, 'Image');
    t.deepEqual(result, [COMPONENTS[1]]);
  });

	// filterComponentsInSectionsByExactName

  it('should return components at any level with exact name', () => {
    const result = utils.filterComponentsInSectionsByExactName(SECTIONS, 'Image');
    t.deepEqual(result, [COMPONENTS[1]]);
  });

	// getComponentNameFromHash

  it('should return important part of hash if it contains component name', () => {
    const result = utils.getComponentNameFromHash('#!/Button');
    t.deepEqual(result, 'Button');
  });

  it('should return null if hash contains no component name', () => {
    const result = utils.getComponentNameFromHash('Button');
    t.deepEqual(result, null);
  });
});
