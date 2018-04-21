import expect from 'expect';
import journalEntryReducer from '../reducer';
import { fromJS } from 'immutable';

describe('journalEntryReducer', () => {
  it('returns the initial state', () => {
    expect(journalEntryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
