import expect from 'expect';
import sampleContainerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('sampleContainerReducer', () => {
  it('returns the initial state', () => {
    expect(sampleContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
