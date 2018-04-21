import expect from 'expect';
import publicContainerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('publicContainerReducer', () => {
  it('returns the initial state', () => {
    expect(publicContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
