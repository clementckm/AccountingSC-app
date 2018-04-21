import expect from 'expect';
import createAccountReducer from '../reducer';
import { fromJS } from 'immutable';

describe('createAccountReducer', () => {
  it('returns the initial state', () => {
    expect(createAccountReducer(undefined, {})).toEqual(fromJS({}));
  });
});
