import expect from 'expect';
import accountingModuleReducer from '../reducer';
import { fromJS } from 'immutable';

describe('accountingModuleReducer', () => {
  it('returns the initial state', () => {
    expect(accountingModuleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
