import expect from 'expect';
import logInReducer from '../reducer';
import { fromJS } from 'immutable';

describe('logInReducer', () => {
  it('returns the initial state', () => {
    expect(logInReducer(undefined, {})).toEqual(fromJS({}));
  });
});
