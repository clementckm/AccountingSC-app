/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

// import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

// import globalReducer from 'containers/App/reducer';
// function globalReducer (state = fromJS({}), action) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }
/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer (name, reducer) {
	const reducerObj = Object.assign({});
	reducerObj[name] = reducer;
  return combineReducers(reducerObj);
}
