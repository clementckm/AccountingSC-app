import expect from 'expect';
import registerAccountReducer from '../reducer';
import { fromJS } from 'immutable';

describe('registerAccountReducer', () => {
  it('returns the initial state', () => {
    expect(registerAccountReducer(undefined, {})).toEqual(fromJS({}));
  });
});
