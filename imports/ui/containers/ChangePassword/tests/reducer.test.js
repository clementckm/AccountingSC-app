import expect from 'expect';
import changePasswordReducer from '../reducer';
import { fromJS } from 'immutable';

describe('changePasswordReducer', () => {
  it('returns the initial state', () => {
    expect(changePasswordReducer(undefined, {})).toEqual(fromJS({}));
  });
});
