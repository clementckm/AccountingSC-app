import expect from 'expect';
import logOutReducer from '../reducer';
import { fromJS } from 'immutable';

describe('logOutReducer', () => {
  it('returns the initial state', () => {
    expect(logOutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
