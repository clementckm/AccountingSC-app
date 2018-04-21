import expect from 'expect';
import resetPasswordReducer from '../reducer';
import { fromJS } from 'immutable';

describe('resetPasswordReducer', () => {
  it('returns the initial state', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(fromJS({}));
  });
});
