/*
 *
 * LogOut reducer
 *
 */

import { fromJS } from 'immutable';
import { REDUCER_ONE } from './constants';

const initialState = fromJS({
	var1: ''
});

export default function reducer (state = initialState, action) {
 switch (action.type) {
	case REDUCER_ONE:
		return state.set('var1', action.correctAnswer);
		// ALWAYS INCLUDE CANCEL_SAGAS for app stability.
	case 'CANCEL_SAGAS':
		return initialState;
	default:
		return state;
 }
}
