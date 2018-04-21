import expect from 'expect';
import financialStatementReducer from '../reducer';
import { fromJS } from 'immutable';

describe('financialStatementReducer', () => {
  it('returns the initial state', () => {
    expect(financialStatementReducer(undefined, {})).toEqual(fromJS({}));
  });
});
