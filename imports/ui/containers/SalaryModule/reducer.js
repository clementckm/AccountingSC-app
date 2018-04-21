/*
 *
 * SalaryModule reducer
 *
 */

import { fromJS } from 'immutable';
import { UPDATE_LEDGER, EVENT_LEDGER } from './constants';

const initialState = fromJS({
  updateEvent: ''
});

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case EVENT_LEDGER:
    return state.set('updateEvent', 'Submitted to Blockchain!');
    case 'CANCEL_SAGAS':
    return state;
  default:
    return state;
  }
}
