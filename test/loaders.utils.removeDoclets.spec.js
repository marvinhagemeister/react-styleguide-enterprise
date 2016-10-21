import { assert as t } from 'chai';
import removeDoclets from '../loaders/utils/removeDoclets';

/* eslint-disable quotes */
describe('removeDoclets', () => {
  it('should find calls to require in code', () => {
    const text = `
Component is described here.

@example ./extra.examples.md
@foo bar
`;
    const expected = `
Component is described here.


`;
    const actual = removeDoclets(text);
    t.equal(actual, expected);
  });
});
