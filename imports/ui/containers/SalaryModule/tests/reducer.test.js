import expect from 'expect';
import salaryModuleReducer from '../reducer';
import { fromJS } from 'immutable';

describe('salaryModuleReducer', () => {
  it('returns the initial state', () => {
    expect(salaryModuleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
